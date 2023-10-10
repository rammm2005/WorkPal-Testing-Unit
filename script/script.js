$(document).ready(function () {
  const categoryMenu = $("#categoryMenu");
  const lengthScroll = $(window).width();

  categoryMenu.css("display", "none");

  function toggleCategoryMenu() {
    let currentScroll = $(window).scrollTop();
    // console.log($(window).scrollTop());

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
        $(closeNav).css("z-index", "999");
        $("body").toggleClass("active").css("z-index", "999");
      } else if (visiblelity === "true") {
        $(navLink).attr("data-visible", "false");
        $(toogleNav).attr("aria-expanded", "false");
        $(closeNav).css("transform", "translateX(100%)");
        $(closeNav).css("z-index", "998");
        $("body").removeClass("active").css("z-index", "999");
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

  // Show and hide login
  const rPass = $("#eye-rpass");
  const pass = $("#eye-pass");

  rPass.each(function () {
    const eyeIcon = $(this);
    eyeIcon.click(function () {
      let pwFields = eyeIcon.closest(".left-content").find(".password #rpass");

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
  $(".modal-container").hide();
  $(".modal-show").click(function () {
    const targetModal = $(this).attr("data-modal-target");
    $("#" + targetModal).toggleClass("active");
    $(".modal-container").show();
    $(".modal-container").css("display", "flex");
    $("body").toggleClass("active");
  });

  $(".close-btn").click(function () {
    const modal = $(this).closest(".modal-container");
    modal.removeClass("active");
    $(".modal-container").hide();
    $("body").removeClass("active");
  });

  $(window).scroll(function () {
    $(".modal-container").removeClass("active");
    $(".modal-container").hide();
    $("body").removeClass("active");
    $(navLink).attr("data-visible", "false");
    $(toogleNav).attr("aria-expanded", "false");
    $(closeNav).css("transform", "translateX(100%)");
    toogleNav.removeClass("active");
  });

  //  Search auto complate
  $("#search").on("input", function () {
    let inputVal = $(this).val().toLowerCase();
    if (inputVal === "") {
      $(".result-search-box").hide();
      $(".not-found").hide();
    } else {
      $(".result-search-box").show();
    }

    let found = false;

    // filter
    $(".content-result-search").each(function () {
      if ($(this).text().toLowerCase().indexOf(inputVal) > -1) {
        $(this).show();
        found = true;
      } else {
        $(this).hide();
      }
    });

    // not found
    if (!found) {
      $(".not-found").show();
    } else {
      $(".not-found").hide();
    }
  });

  // 1 dari search di click
  $(".content-result-search").click(function () {
    let selectedText = $(this).text();
    selectedText = selectedText.trim();
    $("#search").val(selectedText);
    $(".result-search-box").hide();

    $(this).text("");
  });

  // keluarkan search di click
  $(document).click(function (event) {
    if (!$(event.target).closest(".search-container").length) {
      $(".result-search-box").hide();
    }
  });

  $(".wishlist-wrapper").on("click", ".wishlist-status", function () {
    var scaleUp = $(this).find(".scale-up");
    scaleUp.toggleClass("active");
  });

  // Faq function
  $(".accrodion-left .faq").click(function () {
    let clickedLi = $(this).closest(".faq");

    $(".accrodion-left .faq").not(clickedLi).removeClass("showAnswer");

    clickedLi.toggleClass("showAnswer");
  });

  // Comunity card about
  const comunityCards = $(".comunity .comunity-card");

  let maxHeight = 0;

  comunityCards.each(function () {
    const cardHeight = $(this).outerHeight();
    if (cardHeight > maxHeight) {
      maxHeight = cardHeight;
    }
  });

  comunityCards.css("height", `${maxHeight}px`);

  // Notif show
  const toogleNotif = $("#notification");
  const notifClose = $("#notif-close");

  toogleNotif.click(function () {
    $(".notification-show").toggleClass("showing");
  });

  notifClose.click(function () {
    $(".notification-show").removeClass("showing");
  });

  const soundIcon = $("#footer-notif");
  const soundText = $("#sound-text");

  soundIcon.click(function () {
    if (soundIcon.hasClass("bx-volume-full")) {
      soundIcon.removeClass("bx-volume-full").addClass("bx-volume-mute");
      soundText.text("Muted");
    } else {
      soundIcon.removeClass("bx-volume-mute").addClass("bx-volume-full");
      soundText.text("Sound");
    }
  });

  // Hovered Images
  $(".image-hover img").hover(
    function () {
      $(this).siblings(".hover-btn").fadeIn();
    },
    function () {
      $(this).siblings(".hover-btn").fadeOut();
    }
  );

  // Product Pagination
  const productWrapper = $("#productWrapper");
  const pagination = $("#pagination");
  const itemsPerPage = 8;
  const totalItems = $(".product-content").length;
  let currentPage = 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const products = $(".product-content");

    products.hide();

    for (let i = start; i < end; i++) {
      if (i < totalItems) {
        const product = products.eq(i);
        const skeleton = $('<div class="loading-skeleton"></div>');
        productWrapper.append(skeleton);
      }
    }

    setTimeout(function () {
      productWrapper.find(".loading-skeleton").remove();
      for (let i = start; i < end; i++) {
        if (i < totalItems) {
          const product = products.eq(i);
          product.show();
        }
      }
    }, 2000);
  }

  function createPaginationButtons() {
    const prevButton = $(
      '<button><i class="bx bx-left-arrow-alt"></i></button>'
    );
    prevButton.click(function () {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updatePagination();
      }
    });
    pagination.append(prevButton);

    // for
    for (let i = 1; i <= totalPages; i++) {
      const span = $("<span></span>").text(i);

      if (i === 1) {
        span.toggleClass("active");
      }

      // to set click on page number
      (function (pageNumber) {
        span.click(function () {
          currentPage = pageNumber;
          showPage(currentPage);
          updatePagination();
        });
      })(i);

      pagination.append(span);
    }

    const nextButton = $(
      '<button><i class="bx bx-right-arrow-alt"></i></button>'
    );
    nextButton.click(function () {
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        updatePagination();
      }
    });
    pagination.append(nextButton);

    updatePagination();
  }

  // func update ketika di click
  function updatePagination() {
    const spans = pagination.find("span");
    spans.removeClass("active");
    spans.eq(currentPage - 1).addClass("active");

    if (currentPage === 1) {
      pagination
        .find(".bx-left-arrow-alt")
        .parent("button")
        .prop("disabled", true);
    } else {
      pagination
        .find(".bx-left-arrow-alt")
        .parent("button")
        .prop("disabled", false);
    }
    if (currentPage === totalPages) {
      pagination
        .find(".bx-right-arrow-alt")
        .parent("button")
        .prop("disabled", true);
    } else {
      pagination
        .find(".bx-right-arrow-alt")
        .parent("button")
        .prop("disabled", false);
    }
  }

  showPage(currentPage);
  createPaginationButtons();

  // Image Upload Props
  const imageResult = $(".image-result");
  const inputFile = $("#file");

  imageResult.on("click", function () {
    inputFile.click();
  });

  inputFile.on("change", function () {
    const image = this.files[0];
    if (image.size < 5000000) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = $("<img>");
        img.attr("src", reader.result);
        imageResult.find("img").remove();
        imageResult.append(img);
        imageResult.addClass("active");
        imageResult.attr("data-img", image.name);
      };
      reader.readAsDataURL(image);
    } else {
      alert("Image size must be less than 5MB");
    }
  });

  // Filter
  $("[data-target]").click(function () {
    var targetId = $(this).attr("data-target");
    $("form.content-scroll").removeClass("active");
    $(".btn-filter i.bx-chevron-down").removeClass("rotated");

    $(targetId).addClass("active");
    $(this).find("i.bx-chevron-down").addClass("rotated");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest("[data-target], .content-scroll").length) {
      $("form.content-scroll").removeClass("active");
      $(".btn-filter i.bx-chevron-down").removeClass("rotated");
    }
  });

  // Default filter
  $(".filter-sort").click(function () {
    $("#sortDropdown").toggle();
  });

  $(".sort-select p[data-value]").click(function () {
    var selectedValue = $(this).data("value");
    $(".selected-option").text(selectedValue);
    $("#sortDropdown").hide();
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".filter-sort").length) {
      $("#sortDropdown").hide();
    }
  });

  // Filter Mobile

  $(".filter-content #input-checked").hide();

  $(".filter-content .title").click(function () {
    $(this).siblings("#input-checked").toggle();

    var icon = $(this).find("i.bx");
    icon.toggleClass("bxs-chevron-up");
    icon.toggleClass("bxs-chevron-down");
  });

  // Tabs Profile
  $(".header-link .link-sub").on("click", function () {
    $(".link-sub").removeClass("active");

    $(this).addClass("active");

    const tabId = $(this).data("tab");

    $(".subs-menu-content-show > div").hide();

    $("#" + tabId).show();
  });

  const defaultTabId = $(".header-link .link-sub.active").data("tab");
  $(".subs-menu-content-show > div")
    .not("#" + defaultTabId)
    .hide();

  $('.switch input[type="checkbox"]').change(function () {
    var targetLabel = $(this).closest(".wrapper-switch").find(".text");
    if ($(this).is(":checked")) {
      targetLabel.text("Enabled");
    } else {
      targetLabel.text("Disabled");
    }
  });

  // Mobile User Profile

  $("#open-toogle").click(function () {
    $(".client-side-menu").toggleClass("active");
    if ($(".client-side-menu").hasClass("active")) {
      $("#open-toogle i").removeClass("bx-menu-alt-left").addClass("bx-x");
    } else {
      $("#open-toogle i").removeClass("bx-x").addClass("bx-menu-alt-left");
    }
  });

  $("#img-heartlist").click(function () {
    $("#img-heartlist").toggleClass("active");
  });

  $("#sort-review").click(function () {
    $("#show-review-sort").toggleClass("active");
  });

  // read more
  const $readMoreToggle = $("#read-more-toggle");
  const $paragraphs = $("#read-more").find("p,span");

  let isOpen = false;

  function updateText() {
    if (isOpen) {
      $paragraphs.show();
      $readMoreToggle.text("Read Less...");
    } else {
      $paragraphs.each(function (index) {
        if (index > 0) {
          $(this).hide();
        }
      });
      $readMoreToggle.text("Read More...");
    }
  }

  updateText();

  $readMoreToggle.click(function (e) {
    e.preventDefault();
    isOpen = !isOpen;
    updateText();
  });

  // Fancy Box Javascript

  $(".fancybox").fancybox();

  $(".fancybox-effects-a").fancybox({
    helpers: {
      title: {
        type: "outside",
      },
      overlay: {
        speedOut: 0,
      },
    },
  });

  $(".fancybox-effects-b").fancybox({
    openEffect: "none",
    closeEffect: "none",

    helpers: {
      title: {
        type: "over",
      },
    },
  });

  $(".fancybox-effects-c").fancybox({
    wrapCSS: "fancybox-custom",
    closeClick: true,

    openEffect: "none",

    helpers: {
      title: {
        type: "inside",
      },
      overlay: {
        css: {
          background: "rgba(238,238,238,0.85)",
        },
      },
    },
  });

  $(".fancybox-effects-d").fancybox({
    padding: 0,

    openEffect: "elastic",
    openSpeed: 150,

    closeEffect: "elastic",
    closeSpeed: 150,

    closeClick: true,

    helpers: {
      overlay: null,
    },
  });

  $(".fancybox-buttons").fancybox({
    openEffect: "none",
    closeEffect: "none",

    prevEffect: "none",
    nextEffect: "none",

    closeBtn: false,

    helpers: {
      title: {
        type: "inside",
      },
      buttons: {},
    },

    afterLoad: function () {
      this.title =
        "Image " +
        (this.index + 1) +
        " of " +
        this.group.length +
        (this.title ? " - " + this.title : "");
    },
  });

  $('#images-payment .img input[type="checkbox"]').change(function () {
    var $checkbox = $(this);
    var $image = $checkbox.siblings("img");

    $("#images-payment .img img").removeClass("active");
    $('#images-payment .img input[type="checkbox"]').prop("checked", false);
    $(this).prop("checked", true);

    if ($checkbox.is(":checked")) {
      $image.addClass("active");
    } else {
      $image.removeClass("active");
      $checkbox.prop("checked", false);
    }
  });


});
