/* =========================================================
   HOPE SIDDHA CLINIC
   RESPONSIVE MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.querySelector(".nav-menu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {

            const isOpen = navMenu.classList.toggle("show");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }

            menuBtn.setAttribute("aria-expanded", isOpen);

        });

        /* Close menu when clicking navigation link */

        document.querySelectorAll(".nav-link").forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("show");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

                menuBtn.setAttribute("aria-expanded", "false");

            });

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

        if (!menuBtn || !navMenu) {
            return;
        }

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedMenuButton =
            menuBtn.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedMenuButton &&
            navMenu.classList.contains("show")
        ) {

            navMenu.classList.remove("show");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

            menuBtn.setAttribute("aria-expanded", "false");
        }

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");

    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    function revealOnScroll() {

        revealElements.forEach(function (element) {

            const elementTop =
                element.getBoundingClientRect().top;

            if (
                elementTop <
                window.innerHeight - 80
            ) {

                element.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        revealOnScroll,
        { passive: true }
    );

    revealOnScroll();


    /* =====================================================
       BMI CALCULATOR
    ===================================================== */

    const heightInput =
        document.getElementById("bmiHeight");

    const weightInput =
        document.getElementById("bmiWeight");

    const calculateBtn =
        document.getElementById("calculateBMI");

    const resetBtn =
        document.getElementById("resetBMI");

    const bmiNumber =
        document.getElementById("bmiNumber");

    const bmiCategory =
        document.getElementById("bmiCategory");

    const bmiMessage =
        document.getElementById("bmiMessage");

    const bmiError =
        document.getElementById("bmiError");

    const gaugeValue =
        document.querySelector(".gauge-value");

    const bmiNeedle =
        document.getElementById("bmiNeedle");


    /* =====================================================
       BMI CALCULATION
    ===================================================== */

    function calculateBMI() {

        if (!heightInput || !weightInput) {
            return;
        }

        const height =
            parseFloat(heightInput.value);

        const weight =
            parseFloat(weightInput.value);


        /* Clear old error */

        if (bmiError) {
            bmiError.textContent = "";
        }


        /* Empty input validation */

        if (
            Number.isNaN(height) ||
            Number.isNaN(weight)
        ) {

            if (bmiError) {
                bmiError.textContent =
                    "Please enter both height and weight.";
            }

            return;
        }


        /* Height validation */

        if (
            height < 50 ||
            height > 250
        ) {

            if (bmiError) {
                bmiError.textContent =
                    "Height should be between 50 and 250 cm.";
            }

            return;
        }


        /* Weight validation */

        if (
            weight < 10 ||
            weight > 300
        ) {

            if (bmiError) {
                bmiError.textContent =
                    "Weight should be between 10 and 300 kg.";
            }

            return;
        }


        /* BMI calculation */

        const heightInMeters =
            height / 100;

        const bmi =
            weight /
            (heightInMeters * heightInMeters);

        const roundedBMI =
            bmi.toFixed(1);


        /* Display BMI number */

        if (bmiNumber) {

            bmiNumber.textContent =
                "BMI " + roundedBMI;

        }


        if (gaugeValue) {

            gaugeValue.textContent =
                roundedBMI;

        }


        /* =================================================
           BMI CATEGORY
        ================================================= */

        let category = "";
        let message = "";
        let statusClass = "";


        if (bmi < 18.5) {

            category = "Underweight";

            message =
                "Your BMI is below the normal range.";

            statusClass = "underweight";

        }

        else if (bmi < 25) {

            category = "Normal Weight";

            message =
                "Your BMI is within the normal range.";

            statusClass = "normal";

        }

        else if (bmi < 30) {

            category = "Overweight";

            message =
                "Your BMI is above the normal range.";

            statusClass = "overweight";

        }

        else {

            category = "Obesity";

            message =
                "Your BMI is in the obesity range.";

            statusClass = "obese";

        }


        /* Display category */

        if (bmiCategory) {

            bmiCategory.textContent =
                category;

            bmiCategory.classList.remove(
                "underweight",
                "normal",
                "overweight",
                "obese"
            );

            bmiCategory.classList.add(
                statusClass
            );

        }


        /* Display message */

        if (bmiMessage) {

            bmiMessage.textContent =
                message;

        }


        /* =================================================
           BMI GAUGE NEEDLE
        ================================================= */

        if (bmiNeedle) {

            const limitedBMI =
                Math.min(
                    Math.max(bmi, 0),
                    40
                );

            const angle =
                -90 +
                (limitedBMI / 40) * 180;

            bmiNeedle.style.transform =
                "rotate(" + angle + "deg)";

        }


        /* =================================================
           RESULT ANIMATION
        ================================================= */

        const bmiCard =
            document.querySelector(".bmi-card");

        if (bmiCard) {

            bmiCard.classList.remove(
                "bmi-result-animation"
            );

            /* Force browser repaint */

            void bmiCard.offsetWidth;

            bmiCard.classList.add(
                "bmi-result-animation"
            );

        }

    }


    /* =====================================================
       BMI CALCULATE BUTTON
    ===================================================== */

    if (calculateBtn) {

        calculateBtn.addEventListener(
            "click",
            calculateBMI
        );

    }


    /* =====================================================
       BMI ENTER KEY
    ===================================================== */

    function handleBMIEnter(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            calculateBMI();

        }

    }


    if (heightInput) {

        heightInput.addEventListener(
            "keydown",
            handleBMIEnter
        );

    }


    if (weightInput) {

        weightInput.addEventListener(
            "keydown",
            handleBMIEnter
        );

    }


    /* =====================================================
       RESET BMI
    ===================================================== */

    if (resetBtn) {

        resetBtn.addEventListener(
            "click",
            function () {

                if (heightInput) {
                    heightInput.value = "";
                }

                if (weightInput) {
                    weightInput.value = "";
                }

                if (bmiNumber) {

                    bmiNumber.textContent =
                        "BMI --";

                }

                if (bmiCategory) {

                    bmiCategory.textContent =
                        "Enter your details";

                    bmiCategory.classList.remove(
                        "underweight",
                        "normal",
                        "overweight",
                        "obese"
                    );

                }

                if (bmiMessage) {

                    bmiMessage.textContent =
                        "Your BMI result will appear here.";

                }

                if (bmiError) {

                    bmiError.textContent = "";

                }

                if (gaugeValue) {

                    gaugeValue.textContent =
                        "--";

                }

                if (bmiNeedle) {

                    bmiNeedle.style.transform =
                        "rotate(-90deg)";

                }

            }
        );

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const nameInput =
                    document.getElementById("name");

                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                alert(
                    "Thank you, " +
                    (name || "there") +
                    "! Your enquiry has been received."
                );

                contactForm.reset();

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.getElementById("backTop");

    function updateBackTop() {

        if (!backTop) {
            return;
        }

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }

    window.addEventListener(
        "scroll",
        updateBackTop,
        { passive: true }
    );

    updateBackTop();


    if (backTop) {

        backTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       NAVBAR SHADOW
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 30) {

            navbar.classList.add(
                "navbar-scrolled"
            );

        } else {

            navbar.classList.remove(
                "navbar-scrolled"
            );

        }

    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                let target;

                try {

                    target =
                        document.querySelector(targetId);

                } catch (error) {

                    return;

                }


                if (!target) {
                    return;
                }


                event.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight -
                    10;


                window.scrollTo({

                    top: Math.max(
                        targetPosition,
                        0
                    ),

                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       SERVICE BUTTONS
    ===================================================== */

    const serviceButtons =
        document.querySelectorAll(
            ".service-learn-more"
        );


    serviceButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        this.closest(
                            ".service-card"
                        );

                    if (!card) {
                        return;
                    }


                    card.classList.toggle(
                        "expanded"
                    );


                    /* Change button text */

                    if (
                        card.classList.contains(
                            "expanded"
                        )
                    ) {

                        this.textContent =
                            "Show Less";

                    } else {

                        this.textContent =
                            "Learn More";

                    }

                }
            );

        }
    );


    /* =====================================================
       FLOATING TOP BUTTON
    ===================================================== */

    const floatingTop =
        document.querySelector(
            ".floating-contact .top-btn"
        );


    if (floatingTop) {

        floatingTop.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       ESC KEY
       CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navMenu &&
                navMenu.classList.contains("show")
            ) {

                navMenu.classList.remove(
                    "show"
                );

                if (menuBtn) {

                    const icon =
                        menuBtn.querySelector("i");

                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =====================================================
       WINDOW RESIZE
       CLOSE MENU WHEN RETURNING TO DESKTOP
    ===================================================== */

    let previousWidth =
        window.innerWidth;


    window.addEventListener(
        "resize",
        function () {

            const currentWidth =
                window.innerWidth;


            /*
               If user changes from mobile
               to desktop, close mobile menu.
            */

            if (
                previousWidth <= 850 &&
                currentWidth > 850
            ) {

                if (navMenu) {
                    navMenu.classList.remove("show");
                }

                if (menuBtn) {

                    const icon =
                        menuBtn.querySelector("i");

                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }


            previousWidth =
                currentWidth;

        }
    );


    /* =====================================================
       IMAGE ERROR HANDLING
       Prevent broken image layout
    ===================================================== */

    document.querySelectorAll(
        "img"
    ).forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                this.classList.add(
                    "image-error"
                );

            }
        );

    });


    /* =====================================================
       REDUCED MOTION SUPPORT
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        document.documentElement.style
            .scrollBehavior = "auto";

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateActiveNavigation();
    revealOnScroll();
    updateBackTop();
    updateNavbar();

});

/* =====================================================
   BMI SPEEDOMETER CALCULATOR
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const heightInput =
        document.getElementById("bmiHeight");

    const weightInput =
        document.getElementById("bmiWeight");

    const calculateBtn =
        document.getElementById("calculateBMI");

    const resetBtn =
        document.getElementById("resetBMI");

    const bmiNumber =
        document.getElementById("bmiNumber");

    const bmiCategory =
        document.getElementById("bmiCategory");

    const bmiMessage =
        document.getElementById("bmiMessage");

    const bmiError =
        document.getElementById("bmiError");

    const gaugeValue =
        document.querySelector(".gauge-value");

    const bmiNeedle =
        document.getElementById("bmiNeedle");


    /* =====================================================
       CALCULATE BMI
    ===================================================== */

    function calculateBMI() {

        const height =
            parseFloat(heightInput.value);

        const weight =
            parseFloat(weightInput.value);


        /* CLEAR ERROR */

        bmiError.textContent = "";


        /* EMPTY CHECK */

        if (
            Number.isNaN(height) ||
            Number.isNaN(weight)
        ) {

            bmiError.textContent =
                "Please enter height and weight.";

            return;

        }


        /* HEIGHT CHECK */

        if (
            height < 50 ||
            height > 250
        ) {

            bmiError.textContent =
                "Height must be between 50 and 250 cm.";

            return;

        }


        /* WEIGHT CHECK */

        if (
            weight < 10 ||
            weight > 300
        ) {

            bmiError.textContent =
                "Weight must be between 10 and 300 kg.";

            return;

        }


        /* =================================================
           BMI FORMULA
        ================================================= */

        const heightMeter =
            height / 100;

        const bmi =
            weight /
            (heightMeter * heightMeter);

        const value =
            bmi.toFixed(1);


        /* DISPLAY VALUE */

        bmiNumber.textContent =
            "BMI " + value;

        gaugeValue.textContent =
            value;


        /* =================================================
           CATEGORY
        ================================================= */

        let category;
        let message;
        let className;


        if (bmi < 18.5) {

            category = "Underweight";

            message =
                "Your BMI is below the normal range.";

            className = "underweight";

        }

        else if (bmi < 25) {

            category = "Normal Weight";

            message =
                "Your BMI is within the normal range.";

            className = "normal";

        }

        else if (bmi < 30) {

            category = "Overweight";

            message =
                "Your BMI is above the normal range.";

            className = "overweight";

        }

        else {

            category = "Obesity";

            message =
                "Your BMI is in the obesity range.";

            className = "obese";

        }


        /* DISPLAY CATEGORY */

        bmiCategory.textContent =
            category;

        bmiCategory.classList.remove(
            "underweight",
            "normal",
            "overweight",
            "obese"
        );

        bmiCategory.classList.add(
            className
        );


        /* DISPLAY MESSAGE */

        bmiMessage.textContent =
            message;


        /* =================================================
           SPEEDOMETER NEEDLE

           BMI 0  = -90°
           BMI 40 = +90°
        ================================================= */

        const limitedBMI =
            Math.min(
                Math.max(bmi, 0),
                40
            );


        const angle =
            -90 +
            (limitedBMI / 40) * 180;


        bmiNeedle.style.transform =
            "translateX(-50%) rotate(" +
            angle +
            "deg)";


        /* =================================================
           ANIMATION
        ================================================= */

        const result =
            document.querySelector(".bmi-result");

        if (result) {

            result.classList.remove(
                "bmi-result-animation"
            );

            void result.offsetWidth;

            result.classList.add(
                "bmi-result-animation"
            );

        }

    }


    /* =====================================================
       CALCULATE BUTTON
    ===================================================== */

    calculateBtn.addEventListener(
        "click",
        calculateBMI
    );


    /* =====================================================
       ENTER KEY
    ===================================================== */

    heightInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                calculateBMI();
            }

        }
    );


    weightInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                calculateBMI();
            }

        }
    );


    /* =====================================================
       RESET
    ===================================================== */

    resetBtn.addEventListener(
        "click",
        function () {

            heightInput.value = "";

            weightInput.value = "";

            bmiNumber.textContent =
                "BMI --";

            bmiCategory.textContent =
                "Enter your details";

            bmiMessage.textContent =
                "Your BMI result will appear here.";

            bmiError.textContent = "";

            gaugeValue.textContent =
                "--";


            bmiCategory.classList.remove(
                "underweight",
                "normal",
                "overweight",
                "obese"
            );


            /* Reset needle */

            bmiNeedle.style.transform =
                "translateX(-50%) rotate(-90deg)";

        }
    );

});