$(document).ready(function() {
  function toggleSection(event, icon) {
    event.preventDefault();
    event.stopPropagation();
    const sectionContent = $(icon).parent().next('.section-content');
    sectionContent.slideToggle(200); // Make the toggle faster
    $(icon).toggleClass('fa-chevron-down fa-chevron-up');
  }

  window.toggleSection = toggleSection;

  // Show task form popup with animation
  window.showTaskForm = function() {
    $('#taskFormPopup').fadeIn();
  };

  // Close task form popup
  window.closeTaskForm = function() {
    $('#taskFormPopup').fadeOut();
  };

  // Handle form submission
  $('#taskForm').off('submit').on('submit', function(event) {
    event.preventDefault();
    const project = $('#project').val();
    const taskName = $('#taskName').val();
    const taskDescription = $('#taskDescription').val();
    const startDate = $('#startDate').val();
    const priority = $('#priority').val();

    const priorityClass = priority === 'High' ? 'priority-high' : priority === 'Normal' ? 'priority-normal' : 'priority-low';

    const newRow = `
      <tr>
        <td>${taskName} (${project})</td>
        <td>${taskDescription}</td>
        <td><div class="inline-images">
          <img src="https://i.pravatar.cc/30" alt="Avatar" style="border-radius:50%; margin-right:5px;">
        </div></td>
        <td>${startDate}</td>
        <td class="${priorityClass}">
          <i class="fas fa-flag" style="color: ${priority === 'High' ? 'red' : priority === 'Normal' ? 'green' : 'blue'};"></i> ${priority}
        </td>
      </tr>
    `;

    // Append the new row only to the "In progress" section
    $('.section:contains("In progress") .task-table tbody').append(newRow);
    closeTaskForm();
  });

  // Remove old menu click handlers first
  $('.nav-list > li > a').off('click');
  $('.nav-list .sub-menu a').off('click');
  $(document).off('click.submenu');

  // Single consolidated submenu handler
  $('.nav-list > li > a').on('click', function(e) {
    const $submenu = $(this).siblings('.sub-menu');
    if ($submenu.length) {
      e.preventDefault();
      e.stopPropagation();
      
      // Close other submenus
      $('.nav-list > li > a').not(this).siblings('.sub-menu').slideUp(200); // Make the toggle faster
      $('.nav-list > li > a').not(this).find('.fa-chevron-down')
        .removeClass('fa-chevron-down')
        .addClass('fa-chevron-right');
      
      // Toggle current submenu
      $submenu.slideToggle(100); // Make the toggle faster
      $(this).find('.fas').toggleClass('fa-chevron-right fa-chevron-down');
    }
  });

  // Make submenu items clickable without toggling parent
  $('.nav-list .sub-menu a').on('click', function(e) {
    e.stopPropagation();
  });

  // Mobile menu handlers
  $('.mobile-menu-toggle').on('click', function(e) {
    e.stopPropagation();
    $('.sidebar').toggleClass('active');
    $('.sidebar-overlay').toggleClass('active');
  });

  // Close menu when clicking overlay
  $('.sidebar-overlay').on('click', function() {
    $('.sidebar').removeClass('active');
    $('.sidebar-overlay').removeClass('active');
  });

  // Close sidebar when clicking outside or on overlay
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.sidebar, .mobile-menu-toggle').length) {
      $('.sidebar').removeClass('active');
      $('.sidebar-overlay').removeClass('active');
    }
  });

  // Close sidebar when a menu item without a submenu is clicked
  $('.nav-list > li > a').not(':has(+ .sub-menu)').on('click', function(e) {
    if (window.innerWidth <= 768) {
      $('.sidebar').removeClass('active');
      $('.sidebar-overlay').removeClass('active');
    }
  });

  // Handle window resize
  $(window).on('resize', function() {
    if (window.innerWidth > 768) {
      $('.sidebar').removeClass('active');
      $('.sidebar-overlay').removeClass('active');
    }
  });

  // Replace CSS animation with jQuery animation for notification
  $('.close-notification').on('click', function() {
    const $notification = $('.maintenance-notification');
    $notification.animate({
      top: -$notification.outerHeight(),
      opacity: 0
    }, 500, function() {
      $(this).hide();
    });
  });
});

// Remove the duplicate menu handlers from DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Keep only notification related code here
    const closeNotification = document.querySelector('.close-notification');
    if (closeNotification) {
        closeNotification.addEventListener('click', function() {
            const notification = document.querySelector('.maintenance-notification');
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 100);
        });
    }
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('i');
  const logo = document.querySelector('.sidebar-header .logo');
  const logoPath = '/assets/images/';
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    icon.classList.replace('fa-sun', 'fa-moon');
    logo.src = logoPath + 'logo-w.png';
  }

  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
      icon.classList.replace('fa-sun', 'fa-moon');
      logo.src = logoPath + 'logo-w.png';
      localStorage.setItem('theme', 'dark');
    } else {
      icon.classList.replace('fa-moon', 'fa-sun');
      logo.src = logoPath + 'nlogo.png';
      localStorage.setItem('theme', 'light');
    }
  });
});

// Tab Wizard Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.wizard-tab');
    const contents = document.querySelectorAll('.wizard-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const contentId = tab.getAttribute('data-tab');
            document.getElementById(contentId).classList.add('active');
        });
    });
});
