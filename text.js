         var tabsBox = $(".category-menu-wrapper");

    let isDragg = false;

        const dragging = (e) => {
            // console.log("mamaeeee........");
            if(!isDragg) return;
            tabsBox.scrollLeft(tabsBox.scrollLeft() - e.originalEvent.movementX);
        }

        tabsBox.on('mousemove', () => isDragg = true);
        tabsBox.on('mousedown', dragging);

const wrapper = $("#carousel");
    const carousel = $(".popular-service-slider");
    const firstCardWidth = carousel.find(".popular-service").outerWidth();
    const leftArrow = $("#prevArrow");
    const rightArrow = $("#nextArrow");

    const carouselChildrens = Array.from(carousel.children());

    let isSwipe = false;
    let isAutoPlay = true;
    let startX, startScrollLeft;
    let timeoutId;

    let cardPerView = Math.round(carousel.width() / firstCardWidth);

    carouselChildrens.slice(-cardPerView).reverse().forEach(function (child) {
        carousel.prepend($(child).clone());
    });

    carouselChildrens.slice(0, cardPerView).forEach(function (child) {
        carousel.append($(child).clone());
    });

    carousel.addClass("no-transition");
    carousel.scrollLeft(carousel.width());
    carousel.removeClass("no-transition");

    leftArrow.on("click", function () {
        carousel.scrollLeft(carousel.scrollLeft() - firstCardWidth);
    });

    rightArrow.on("click", function () {
        carousel.scrollLeft(carousel.scrollLeft() + firstCardWidth);
    });

    const dragStart = (e) => {
        isSwipe = true;
        carousel.addClass("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft();
    }

    const swipe = (e) => {
        if (!isSwipe) return;
        carousel.scrollLeft(startScrollLeft - (e.pageX - startX));
    }

    const swipeStop = () => {
        isSwipe = false;
        carousel.removeClass("dragging");
    }

    const infiniteScroll = () => {
        if (carousel.scrollLeft() === 0) {
            carousel.addClass("no-transition");
            carousel.scrollLeft(carousel[0].scrollWidth - (2 * carousel.width()));
            carousel.removeClass("no-transition");
        }
        else if (Math.ceil(carousel.scrollLeft()) === carousel[0].scrollWidth - carousel.width()) {
            carousel.addClass("no-transition");
            carousel.scrollLeft(carousel.width());
            carousel.removeClass("no-transition");
        }

        clearTimeout(timeoutId);
        if (!wrapper.is(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if ($(window).width() < 800 || !isAutoPlay) return; 
        timeoutId = setTimeout(function () {
            carousel.scrollLeft(carousel.scrollLeft() + firstCardWidth);
        }, 2500);
    }
    autoPlay();

    carousel.on("mousedown", dragStart);
    carousel.on("mousemove", swipe);
    $(document).on("mouseup", swipeStop);
    carousel.on("scroll", infiniteScroll);
    wrapper.on("mouseenter", function () {
        clearTimeout(timeoutId);
    });
    wrapper.on("mouseleave", autoPlay);



     const sliderItem = $('.popular-service-slider .popular-service');
    let selectItems = 0;
    const prevArrow = $('.arrow #prevArrow');
    const nextArrow = $('.arrow #nextArrow');

    function slideItemSet(index){
      selectItems = index;

      sliderItem.each(function (idx) {
        let offset = idx - selectItems;
        if(offset < 0) offset += sliderItem.length;

        // console.log(offset); 
        for(let i = 0 ; i < sliderItem.length + 1 ; i++){
            $(this).removeClass(`item-${i}`).addClass(`item-${offset + 1}`);
        }
      });
    }
    sliderItem.click(function(){
      slideItemSet($(this).index());
    });

    nextArrow.click(function () {
        selectItems = selectItems < sliderItem.length - 1 ? ++selectItems:0;
        slideItemSet(selectItems); 
    });

    prevArrow.click(function () {
        selectItems = selectItems >= 1 ? --selectItems : sliderItem.length -1;
        slideItemSet(selectItems);
    });

     // const slidemain = $("#slider-popular");
  // const item = slidemain.find(".popular-service");
  // const navNextButton = $("#nextArrow");
  // const navPrevButton = $("#prevArrow");

  // navNextButton.click(function () {
  //   slidemain.append(item.first(+1));
  //   // console.log(slidemain);
  // });

  navPrevButton.click(function () {
    slidemain.prepend(item.last(-1));
    console.log(slidemain);
  });

   // const slidemain = $("#slider-popular");
      // const item = slidemain.find(".popular-service");
      // const totalItems = item.length;
      // let currentIndex = 0;

      // function showSlide(index) {
      //   item.removeClass("active");
      //   item.eq(index).addClass("active");
      // }

      // showSlide(currentIndex);

      // $("#nextArrow").click(function () {
      //   currentIndex = (currentIndex + 1) % totalItems;
      //   console.log(currentIndex);
      // });

      // $("#prevArrow").click(function () {
      //   currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      //   showSlide(currentIndex);
      // });



    //       const slidemain = $("#slider-popular");
    // const item = slidemain.find(".popular-service");
    // const navNextButton = $("#nextArrow");
    // const navPrevButton = $("#prevArrow");

    // let currentIndex = 0; // Menyimpan indeks item yang sedang ditampilkan
    // const autoSlideInterval = 3000; // Interval otomatis dalam milidetik (3 detik)

    // function slideTo(index) {
    //     item.removeClass("active");
    //     item.eq(index).addClass("active");
    //     currentIndex = index;
    // }

    // function slideNext() {
    //     const nextIndex = (currentIndex + 1) % item.length;
    //     slideTo(nextIndex);
    // }

    // function slidePrev() {
    //     const prevIndex = currentIndex === 0 ? item.length - 1 : currentIndex - 1;
    //     slideTo(prevIndex);
    // }

    // navNextButton.click(function () {
    //     slideNext();
    // });

    // navPrevButton.click(function () {
    //     slidePrev();
    // });

    // // Fungsi untuk melakukan slide otomatis
    // function autoSlide() {
    //     slideNext();
    // }

    // // Jalankan slide otomatis dengan interval
    // let intervalId = setInterval(autoSlide, autoSlideInterval);

    // // Hentikan slide otomatis saat kursor berada di atas slider
    // slidemain.hover(
    //     function () {
    //         clearInterval(intervalId);
    //     },
    //     function () {
    //         // Mulai kembali slide otomatis saat kursor keluar dari slider
    //         intervalId = setInterval(autoSlide, autoSlideInterval);
    //     }
    // );




    const imageList = $("#slider-popular .popular-service");
    const slideButtons = $(".arrow i");
    // const sliderScrollbar = $(".container .slider-scrollbar");
    // const scrollbarThumb = sliderScrollbar.find(".scrollbar-thumb");
    const maxScrollLeft = imageList.get(0).scrollWidth - imageList.get(0).clientWidth;

    // Handle scrollbar thumb drag
    scrollbarThumb.on("mousedown", function (e) {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.get(0).offsetLeft;
        const maxThumbPosition = sliderScrollbar.get(0).getBoundingClientRect().width - scrollbarThumb.get(0).offsetWidth;

        // Update thumb position on mouse move
        $(document).on("mousemove", function (e) {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.css("left", `${boundedPosition}px`);
            imageList.scrollLeft(scrollPosition);
        });

        // Remove event listeners on mouse up
        $(document).on("mouseup", function () {
            $(document).off("mousemove");
            $(document).off("mouseup");
        });
    });

    // Slide images according to the slide button clicks
    slideButtons.on("click", function () {
        const direction = this.id === "prev-slide" ? -1 : 1;
        const scrollAmount = imageList.get(0).clientWidth * direction;
        imageList.animate({ scrollLeft: `+=${scrollAmount}` }, "slow");
    });

    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons.eq(0).css("display", imageList.scrollLeft() <= 0 ? "none" : "flex");
        slideButtons.eq(1).css("display", imageList.scrollLeft() >= maxScrollLeft ? "none" : "flex");
    };

    // // Update scrollbar thumb position based on image scroll
    // const updateScrollThumbPosition = () => {
    //     const scrollPosition = imageList.scrollLeft();
    //     const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.width() - scrollbarThumb.width());
    //     scrollbarThumb.css("left", `${thumbPosition}px`);
    // };

    // Call these two functions when image list scrolls
    imageList.on("scroll", function () {
        updateScrollThumbPosition();
        handleSlideButtons();
    });

    // Initialize slider on resize and load
    const initSlider = () => {
        maxScrollLeft = imageList.get(0).scrollWidth - imageList.get(0).clientWidth;
        handleSlideButtons();
        updateScrollThumbPosition();
    };

    $(window).on("resize", initSlider);
    $(window).on("load", initSlider);

    // Initialize slider
    initSlider();
