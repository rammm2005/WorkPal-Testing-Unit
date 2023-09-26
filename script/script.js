$(document).ready(function () {
  const categoryMenu = $("#categoryMenu");
  const lengthScroll = $(window).width();

  categoryMenu.css("display", "none");

  function toggleCategoryMenu() {
    let currentScroll = $(window).scrollTop();

    if (currentScroll > lengthScroll) {
      categoryMenu.css("display", "flex");
    } else {
      categoryMenu.css("display", "none");
    }
  }

  $(window).on("scroll", toggleCategoryMenu);
  toggleCategoryMenu();

  // Navbar toogle Mobile

  const toogleSearch = $("#toogle-search");
  const toogleNav = $("#toogle-nav");
  const navLink = $("#navigation-link");
  const closeNav = $("#sr-x");

  toogleSearch.click(function () {
    toogleSearch.addClass("active");
  });

  toogleNav.click(function () {
    $("body").toggleClass("active");
    $(toogleNav).addClass("active");

    if (toogleNav.hasClass("active")) {
      const visiblelity = navLink.attr("data-visible");
      console.log(visiblelity);
      if (visiblelity === "false") {
        $(navLink).attr("data-visible", "true");
        $(toogleNav).attr("aria-expanded", "true");
        $(closeNav).css("transform", "translateX(0)");
      } else if (visiblelity === "true") {
        $(navLink).attr("data-visible", "false");
        $(toogleNav).attr("aria-expanded", "false");
        $(closeNav).css("transform", "translateX(100%)");
        toogleNav.removeClass("active");
      }
    } else {
      $("body").removeClass("active");
    }
  });

  // Image Freelance Efect
  $("#fadeImg>.freelance-img:gt(0)").hide();
  setInterval(function () {
    $("#fadeImg > .freelance-img:first")
      .fadeOut(1500)
      .next()
      .fadeIn(1500)
      .end()
      .appendTo("#fadeImg");
  }, 6500);

  // Category Slide
  const tabsBox = $(".category-menu-wrapper ul");
  const prevIcon = $("#prevNav i");
  const nextIcon = $("#nextNav i");

  let isDragging = false;
  let startX, startScrollLeft;

  const handleIcons = () => {
    let maxScrollableWidth = tabsBox[0].scrollWidth - tabsBox[0].clientWidth;
    prevIcon
      .parent()
      .css("display", tabsBox.scrollLeft() <= 0 ? "none" : "flex");
    nextIcon
      .parent()
      .css(
        "display",
        maxScrollableWidth - tabsBox.scrollLeft() <= 1 ? "none" : "flex"
      );
  };

  prevIcon.on("click", function () {
    let scrollWidth = tabsBox.scrollLeft() - 340;
    tabsBox.animate({ scrollLeft: scrollWidth }, 300, () => {
      handleIcons();
    });
  });

  nextIcon.on("click", function () {
    let scrollWidth = tabsBox.scrollLeft() + 340;
    tabsBox.animate({ scrollLeft: scrollWidth }, 300, () => {
      handleIcons();
    });
  });

  tabsBox.on("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    startScrollLeft = tabsBox.scrollLeft();
  });

  tabsBox.on("mouseup", () => {
    isDragging = false;
  });

  tabsBox.on("mousemove", (e) => {
    if (isDragging) {
      let movementX = e.pageX - startX;
      tabsBox.scrollLeft(startScrollLeft - movementX);
      handleIcons();
    }
  });

  tabsBox.on("scroll", () => {
    handleIcons();
  });

  // Easing Smooth
  let calcScrollValue = () => {
    let scrollProgress = $("#to-top");
    let progressValue = $(".top-link");
    let topScroll = $(document).scrollTop();
    let calcHeight = $(document).height() - $(window).height();
    let scrollValue = Math.round((topScroll * 100) / calcHeight);
    var scroll = new SmoothScroll('a[href*="#"]:not([data-easing])');

    if (topScroll > 200 && scroll) {
      scrollProgress.css("display", "grid");
      var easeInQuad = new SmoothScroll('[data-easing="easeInQuad"]', {
        easing: "easeInQuad",
      });
    } else {
      scrollProgress.css("display", "none");
    }

    scrollProgress.css(
      "background",
      `conic-gradient(#03cc65 ${scrollValue}% , #d7d7d7 ${scrollValue}%)`
    );
  };
  $(window).scroll(calcScrollValue);
  $(document).ready(calcScrollValue);

  // Popular Slide
  const slidemain = $("#slider-popular");
  const item = slidemain.find(".popular-service");
  const navNextButton = $("#nextArrow");
  const navPrevButton = $("#prevArrow");

  let currentIndex = 0;
  let itemsToShow = 4; // set 4 item dulu

  function showItems(startIndex) {
    item.hide();
    for (let i = startIndex; i < startIndex + itemsToShow; i++) {
      item.eq(i % item.length).show();
    }
  }

  function slideNext() {
    currentIndex = (currentIndex + itemsToShow) % item.length;
    showItems(currentIndex);
  }

  function slidePrev() {
    currentIndex = (currentIndex - itemsToShow + item.length) % item.length;
    showItems(currentIndex);
  }

  showItems(currentIndex);

  navNextButton.click(function () {
    slideNext();
  });

  navPrevButton.click(function () {
    slidePrev();
  });

  // Resize Slide
  $(window).on("resize", function () {
    if ($(window).width() <= 768) {
      itemsToShow = 2;
    } else if ($(window).width() <= 450) {
      itemsToShow = 1;
    } else if ($(window).width() <= 1180) {
      itemsToShow = 3;
    } else {
      itemsToShow = 4;
    }
    showItems(currentIndex); // items perwindow berubah
  });

  // setInterval(slideNext, 3000);

  // Show and hide login
  const rPass = $("#eye-rpass");
  const pass = $("#eye-pass");

  rPass.each(function () {
    const eyeIcon = $(this);
    eyeIcon.click(function () {
      let pwFields = eyeIcon
        .closest(".left-content")
        .find(".password #rpass");

      pwFields.each(function () {
        const password = $(this);
        if (password.attr("type") === "password") {
          password.attr("type", "text");
          eyeIcon.removeClass("bx-hide").addClass("bx-show");
        } else {
          password.attr("type", "password");
          eyeIcon.removeClass("bx-show").addClass("bx-hide");
        }
      });
    });
  });

   pass.each(function () {
    const eyeIcon = $(this);
    eyeIcon.click(function () {
      let pwFields = eyeIcon
        .closest(".left-content")
        .find(".password #password");

      pwFields.each(function () {
        const password = $(this);
        if (password.attr("type") === "password") {
          password.attr("type", "text");
          eyeIcon.removeClass("bx-hide").addClass("bx-show");
        } else {
          password.attr("type", "password");
          eyeIcon.removeClass("bx-show").addClass("bx-hide");
        }
      });
    });
  });



  $(".sign-up").hide();
  
    // Regis
    const signInLink = $(".link-form #swipe-sign-in");
    const signUpLink = $(".link-form #swipe-sign-up");

    signInLink.click(function () {
        $(".sign-in").hide();
        $(".sign-up").show();
        setRightContentHeightRegis();
    });

    signUpLink.click(function () {
        $(".sign-up").hide();
        $(".sign-in").show();
        setRightContentHeightLogin();
    });

    function setRightContentHeightRegis() {
        const leftContentSignRegis = $("#sign-up-l").height();
        $("#sign-up-r").height(leftContentSignRegis);
    }

    function setRightContentHeightLogin() {
        const leftContentSignLogin = $("#sign-in-l").height();
        $("#sign-in-r").height(leftContentSignLogin);
    }

    setRightContentHeightRegis();
    setRightContentHeightLogin();

    $(window).resize(function () {
        setRightContentHeightLogin();
        setRightContentHeightRegis();
    });

  // Modals Seting
});


