/**
 * MODERNO Furniture Studio - Core Interactions & Logic
 * Fully responsive, modern micro-interactions & Georgian interface logic
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. STICKY HEADER & SCROLL BEHAVIOR
     -------------------------------------------------------------------------- */
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Active Navigation Highlight
    let currentSection = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------------------------
     2. MOBILE DRAWER NAVIGATION
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* --------------------------------------------------------------------------
     3. PROJECT GALLERY CATEGORY FILTERING
     -------------------------------------------------------------------------- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectItems = document.querySelectorAll('.project-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active class
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCat === filterValue) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeIn 0.4s ease-out forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     4. PROJECT LIGHTBOX MODAL
     -------------------------------------------------------------------------- */
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxOrderBtn = document.getElementById('lightboxOrderBtn');

  let currentProjectTitle = '';

  projectItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgUrl = item.getAttribute('data-img');
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');
      const cat = item.querySelector('.project-cat')?.textContent || 'პროექტი';

      currentProjectTitle = title;
      lightboxImg.src = imgUrl;
      lightboxImg.alt = title;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;
      lightboxTag.textContent = cat;

      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  if (lightboxOrderBtn) {
    lightboxOrderBtn.addEventListener('click', () => {
      closeLightbox();
      const notesField = document.getElementById('userNotes');
      if (notesField) {
        notesField.value = `დაინტერესებული ვარ მსგავსი პროექტით: "${currentProjectTitle}". მსურს ზუსტი გათვლა.`;
      }
      scrollToSection('#contact');
    });
  }

  /* --------------------------------------------------------------------------
     5. CATEGORY DETAILS MODAL DATA
     -------------------------------------------------------------------------- */
  const categoryData = {
    kitchen: {
      title: "სამზარეულოები შეკვეთით",
      sub: "ინოვაცია, ერგონომიკა და გამძლეობა",
      img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85",
      desc: "ჩვენი სამზარეულოები მზადდება ავსტრიული Blum-ის პრემიუმ მექანიზმებით (Legrabox, Aventos HF, Tip-On Blumotion). ვიყენებთ ტენგამძლე MDF-ს, Finsa-ს, Egger-ის ლამინატსა და კვარცის ან გრანიტის დახვეწილ ზედაპირებს. თითოეული სამზარეულო დაპროექტებულია დიასახლისის მოხერხებულობისთვის — სამუშაო სამკუთხედის ოქროს წესის სრული დაცვით.",
      points: [
        "ჩუმი და რბილი დახურვის უვადო გარანტია Blum-ის მექანიზმებზე",
        "ტენგამძლე და თერმომდგრადი ევროპული ზედაპირები",
        "ინტეგრირებული უჩინარი LED განათება სენსორული ჩართვით",
        "კვარცის, აკრილისა და ბუნებრივი ქვის ზედაპირების მორგება"
      ],
      catName: "სამზარეულოები"
    },
    wardrobes: {
      title: "კარადები და გარდერობული ოთახები",
      sub: "სივრცის მაქსიმალური და ესთეტიკური ათვისება",
      img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
      desc: "ჭერამდე აყვანილი ჩაშენებული კარადები, გასახდელი ოთახები (Walk-in closet) და შეფერილი მინის ვიტრაჟები. თხელი ანოდირებული ალუმინის პროფილები, შიდა რბილი განათება და ხავერდით გაწყობილი აქსესუარების უჯრები.",
      points: [
        "ჭერამდე ზუსტი აყვანა ჭერის დეფექტების დამალვით",
        "ბრინჯაოს, გრაფიტის ან გამჭვირვალე ნაწრთობი მინის კარები",
        "შარვლის, ჰალსტუხისა და ფეხსაცმლის ინტეგრირებული ორგანაიზერები",
        "სენსორული განათება კარების გაღებისას"
      ],
      catName: "კარადები"
    },
    bedroom: {
      title: "საძინებლის ავეჯი",
      sub: "მყუდროება, მშვიდი ტონები და სრული რელაქსაცია",
      img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85",
      desc: "ინდივიდუალური საწოლები რბილი ხავერდოვანი ან ტყავის საზურგეებით, ორთოპედიული ამწევი მექანიზმით და ტევადი სათავსოებით. ჰაეროვანი დაკიდებული ტუმბოები და კოსმეტიკური მაგიდები LED სარკეებით.",
      points: [
        "გაძლიერებული მეტალისა და ხის მყარი კარკასები",
        "ადვილად წმენდადი, წყალგაუმტარი პრემიუმ ქსოვილები",
        "მცურავი (Floating) ეფექტის მქონე დაკიდებული ტუმბოები",
        "ფარული ელექტრო როზეტები და უკაბელო დამტენები"
      ],
      catName: "საძინებლის ავეჯი"
    },
    living: {
      title: "მისაღები ოთახის ავეჯი",
      sub: "სახლის მთავარი ოთახის ცენტრალური აქცენტი",
      img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
      desc: "თანამედროვე TV ზონები ხის აკუსტიკური რეიკებით, დაკიდებული კონსოლებითა და მარმარილოს ან ტრავერტინის ჩანართებით. ინტეგრირებული კაბელების მართვის სისტემა, რათა არცერთი სადენი არ ჩანდეს.",
      points: [
        "აკუსტიკური ხის რეიკები და ბუნებრივი მუხის შპონი",
        "ყველა სადენისა და ტექნიკის სრული დამალვა",
        "თბილი ფონური განათება სიმყუდროვისთვის",
        "ჟურნალის მაგიდები და ვიტრინები ერთიან სტილში"
      ],
      catName: "მისაღები ოთახის ავეჯი"
    },
    office: {
      title: "საოფისე და კომერციული ავეჯი",
      sub: "პრესტიჟი, ერგონომიკა და პროდუქტიულობა",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
      desc: "მენეჯერის სამუშაო მაგიდები, საკონფერენციო სივრცეები, მიმღები (Reception) დახლები და დოკუმენტების საცავები. მასალები გათვლილია მაღალ ექსპლუატაციაზე და ყოველდღიურ დატვირთვაზე.",
      points: [
        "ნაკაწრგამძლე და ადვილად მოსავლელი ზედაპირები",
        "კაბელების ორგანიზატორები და ჩაშენებული როზეტები",
        "აკუსტიკური ტიხრები კონცენტრაციის გასაუმჯობესებლად",
        "კორპორატიულ ფერებსა და ბრენდბუქზე მორგება"
      ],
      catName: "საოფისე ავეჯი"
    },
    custom: {
      title: "ინდივიდუალური ექსკლუზიური პროექტები",
      sub: "რთული არქიტექტურული ფორმები და უნიკალური დეტალები",
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
      desc: "რადიუსული მომრგვალებული ხის პანელები, აბაზანის წყალგამძლე კომპლექტები, ბარის დახლები, რესტორნების ინტერიერის ავეჯი და ნებისმიერი არასტანდარტული დიზაინერული ჩანაფიქრი.",
      points: [
        "რთული 5-ღერძიანი CNC ხის დამუშავება",
        "100% წყალგამძლე მასალები სველი წერტილებისთვის",
        "პერსონალური დიზაინერისა და ინჟინრის ზედამხედველობა",
        "ულიმიტო არჩევანი ფერებში (RAL / NCS კატალოგები)"
      ],
      catName: "ინდივიდუალური პროექტები"
    }
  };

  const catModal = document.getElementById('catModal');
  const catBackdrop = document.getElementById('catBackdrop');
  const catClose = document.getElementById('catClose');
  const catModalBody = document.getElementById('catModalBody');

  window.openCategoryModal = function(catKey) {
    const data = categoryData[catKey];
    if (!data) return;

    let pointsHtml = data.points.map(p => `<li><span style="color:var(--color-accent-gold);margin-right:8px;">✔</span>${p}</li>`).join('');

    catModalBody.innerHTML = `
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 28px; align-items:center;">
        <div>
          <img src="${data.img}" alt="${data.title}" style="width:100%; border-radius: 14px; height: 280px; object-fit:cover; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
        </div>
        <div>
          <span style="font-size:0.75rem; font-weight:700; color:var(--color-accent-gold); text-transform:uppercase; letter-spacing:0.06em;">კოლექცია</span>
          <h2 style="font-size:1.6rem; font-weight:800; color:var(--color-espresso-900); margin: 6px 0 10px;">${data.title}</h2>
          <p style="font-size:0.925rem; font-weight:600; color:var(--color-espresso-700); margin-bottom:12px;">${data.sub}</p>
          <p style="font-size:0.9rem; color:var(--color-espresso-600); line-height:1.55; margin-bottom:18px;">${data.desc}</p>
          <ul style="list-style:none; font-size:0.85rem; color:var(--color-espresso-800); display:flex; flex-direction:column; gap:8px; margin-bottom:24px;">
            ${pointsHtml}
          </ul>
          <button class="btn btn-primary" onclick="closeCategoryModal(); selectCategoryForOrder('${data.catName}')">
            შეუკვეთე ${data.catName}
          </button>
        </div>
      </div>
    `;

    catModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCategoryModal = function() {
    catModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (catClose) catClose.addEventListener('click', window.closeCategoryModal);
  if (catBackdrop) catBackdrop.addEventListener('click', window.closeCategoryModal);

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      window.closeCategoryModal();
      closeDrawer();
    }
  });

  /* --------------------------------------------------------------------------
     6. SELECT CATEGORY & SMOOTH SCROLL TO ORDER FORM
     -------------------------------------------------------------------------- */
  window.selectCategoryForOrder = function(catName) {
    const furnitureTypeSelect = document.getElementById('furnitureType');
    if (furnitureTypeSelect) {
      for (let i = 0; i < furnitureTypeSelect.options.length; i++) {
        if (furnitureTypeSelect.options[i].value === catName || furnitureTypeSelect.options[i].text.includes(catName)) {
          furnitureTypeSelect.selectedIndex = i;
          break;
        }
      }
    }
    scrollToSection('#contact');
    
    // Highlight effect on the input
    setTimeout(() => {
      furnitureTypeSelect.focus();
      furnitureTypeSelect.style.borderColor = 'var(--color-accent-gold)';
      furnitureTypeSelect.style.boxShadow = '0 0 0 4px rgba(194, 157, 98, 0.3)';
      setTimeout(() => {
        furnitureTypeSelect.style.borderColor = '';
        furnitureTypeSelect.style.boxShadow = '';
      }, 1500);
    }, 600);
  };

  function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /* --------------------------------------------------------------------------
     7. INTERACTIVE COST ESTIMATOR LOGIC
     -------------------------------------------------------------------------- */
  const estType = document.getElementById('estType');
  const estMaterial = document.getElementById('estMaterial');
  const estLength = document.getElementById('estLength');
  const estLengthVal = document.getElementById('estLengthVal');
  const estTotalPrice = document.getElementById('estTotalPrice');
  const applyEstToOrderBtn = document.getElementById('applyEstToOrderBtn');

  function calculateEstimate() {
    if (!estType || !estMaterial || !estLength) return;

    const basePrice = parseFloat(estType.selectedOptions[0].getAttribute('data-price')) || 900;
    const materialMultiplier = parseFloat(estMaterial.value) || 1.0;
    const length = parseFloat(estLength.value) || 3.5;

    // Update slider label
    if (estType.value === 'bedroom') {
      estLengthVal.textContent = `${length} კომპლ.`;
    } else {
      estLengthVal.textContent = `${length} მ`;
    }

    const calculatedBase = Math.round(basePrice * materialMultiplier * length);
    const lowEst = Math.round(calculatedBase * 0.95);
    const highEst = Math.round(calculatedBase * 1.10);

    // Format with commas/spaces
    const formatNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    estTotalPrice.textContent = `₾ ${formatNumber(lowEst)} - ${formatNumber(highEst)}`;
  }

  if (estType) estType.addEventListener('change', calculateEstimate);
  if (estMaterial) estMaterial.addEventListener('change', calculateEstimate);
  if (estLength) estLength.addEventListener('input', calculateEstimate);

  // Initialize calculation
  calculateEstimate();

  if (applyEstToOrderBtn) {
    applyEstToOrderBtn.addEventListener('click', () => {
      const typeText = estType.selectedOptions[0].text;
      const matText = estMaterial.selectedOptions[0].text;
      const lengthVal = estLengthVal.textContent;
      const priceText = estTotalPrice.textContent;

      // Map to category
      let mappedCat = "სამზარეულოები";
      if (estType.value === 'wardrobe') mappedCat = "კარადები";
      if (estType.value === 'living') mappedCat = "მისაღები ოთახის ავეჯი";
      if (estType.value === 'bedroom') mappedCat = "საძინებლის ავეჯი";
      if (estType.value === 'office') mappedCat = "საოფისე ავეჯი";

      const furnitureTypeSelect = document.getElementById('furnitureType');
      if (furnitureTypeSelect) {
        for (let i = 0; i < furnitureTypeSelect.options.length; i++) {
          if (furnitureTypeSelect.options[i].value === mappedCat) {
            furnitureTypeSelect.selectedIndex = i;
            break;
          }
        }
      }

      const notesField = document.getElementById('userNotes');
      if (notesField) {
        notesField.value = `წინასწარი კალკულატორით შერჩეული პარამეტრები:\n• კატეგორია: ${typeText}\n• მასალა: ${matText}\n• ზომა/რაოდენობა: ${lengthVal}\n• საორიენტაციო ბიუჯეტი: ${priceText}\nგთხოვთ დამიკავშირდეთ დეტალების დასაზუსტებლად.`;
      }

      scrollToSection('#contact');
      showToast('კალკულატორის პარამეტრები გადატანილია შეკვეთის ფორმაში!');
    });
  }

  /* --------------------------------------------------------------------------
     8. ORDER FORM VALIDATION & SUBMISSION
     -------------------------------------------------------------------------- */
  const orderForm = document.getElementById('orderForm');
  const userNameInput = document.getElementById('userName');
  const userPhoneInput = document.getElementById('userPhone');
  const furnitureTypeInput = document.getElementById('furnitureType');
  const submitBtn = document.getElementById('submitOrderBtn');
  const formSuccessBox = document.getElementById('formSuccessBox');
  const resetFormBtn = document.getElementById('resetFormBtn');

  // Input phone number cleaning
  if (userPhoneInput) {
    userPhoneInput.addEventListener('input', (e) => {
      // Keep only digits and spaces
      e.target.value = e.target.value.replace(/[^\d\s]/g, '');
    });
  }

  function validateField(input, blockId, errorCondition) {
    const block = input.closest('.input-block');
    if (errorCondition) {
      block.classList.add('error');
      return false;
    } else {
      block.classList.remove('error');
      return true;
    }
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      const nameVal = userNameInput.value.trim();
      if (!validateField(userNameInput, 'userName', nameVal.length < 2)) {
        isValid = false;
      }

      // Validate Phone (at least 9 digits)
      const rawDigits = userPhoneInput.value.replace(/\D/g, '');
      if (!validateField(userPhoneInput, 'userPhone', rawDigits.length < 8)) {
        isValid = false;
      }

      // Validate Furniture Category
      if (!validateField(furnitureTypeInput, 'furnitureType', !furnitureTypeInput.value)) {
        isValid = false;
      }

      if (!isValid) {
        showToast('გთხოვთ შეავსოთ სავალდებულო ველები სწორად');
        return;
      }

      // Show loader
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');
      const btnArrow = submitBtn.querySelector('.btn-arrow');

      btnText.style.display = 'none';
      if (btnArrow) btnArrow.style.display = 'none';
      btnSpinner.style.display = 'inline-block';
      submitBtn.disabled = true;

      // Simulate API submit
      setTimeout(() => {
        btnSpinner.style.display = 'none';
        btnText.style.display = 'inline-block';
        if (btnArrow) btnArrow.style.display = 'inline-block';
        submitBtn.disabled = false;

        // Switch to success state
        orderForm.style.display = 'none';
        formSuccessBox.style.display = 'block';

        showToast('✓ შეკვეთა წარმატებით გაიგზავნა! მალე დაგიკავშირდებით.');
      }, 900);
    });

    // Clear error on input
    [userNameInput, userPhoneInput, furnitureTypeInput].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', () => {
          inp.closest('.input-block').classList.remove('error');
        });
      }
    });
  }

  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      orderForm.reset();
      formSuccessBox.style.display = 'none';
      orderForm.style.display = 'flex';
    });
  }

  /* --------------------------------------------------------------------------
     9. TOAST NOTIFICATION HELPER
     -------------------------------------------------------------------------- */
  const toast = document.getElementById('toastNotification');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('active');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }

  // Smooth scroll helper for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

});
