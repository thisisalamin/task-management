$(document).ready(function() {
  function toggleSection(event, icon) {
    event.preventDefault();
    event.stopPropagation();
    const sectionContent = $(icon).parent().next('.section-content');
    sectionContent.slideToggle();
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

  // Add new menu click handler
  $('.nav-list > li > a').on('click', function(e) {
    if ($(this).siblings('.sub-menu').length) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle only this submenu
      const $submenu = $(this).siblings('.sub-menu');
      const $icon = $(this).find('.fa-chevron-right, .fa-chevron-down');
      
      // Don't close if already open
      if (!$submenu.is(':visible')) {
        // Close other submenus
        $('.nav-list > li > a').not(this).siblings('.sub-menu').slideUp(300);
        $('.nav-list > li > a').not(this).find('.fa-chevron-down')
          .removeClass('fa-chevron-down')
          .addClass('fa-chevron-right');
      }
      
      // Toggle current submenu
      $submenu.slideToggle(300);
      $icon.toggleClass('fa-chevron-right fa-chevron-down');
    }
  });

  // Make submenu items clickable without closing
  $('.nav-list .sub-menu a').on('click', function(e) {
    e.stopPropagation();
  });

  // Add this new handler for clicking anywhere else on the page
  $(document).click(function(e) {
    if (!$(e.target).closest('.nav-list').length) {
      $('.sub-menu').slideUp(300);
      $('.nav-list li a .fa-chevron-down').removeClass('fa-chevron-down').addClass('fa-chevron-right');
    }
  });

  // Prevent submenu items from closing the submenu when clicked
  $('.nav-list .sub-menu a').click(function(e) {
    e.stopPropagation();
  });
});

// Add close notification functionality
document.addEventListener('DOMContentLoaded', function() {
    const closeNotification = document.querySelector('.close-notification');
    if (closeNotification) {
        closeNotification.addEventListener('click', function() {
            const notification = document.querySelector('.maintenance-notification');
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300); // matches the CSS transition duration
        });
    }

    // Add click handlers to menu items with submenus
    const menuItems = document.querySelectorAll('.nav-list li');
    
    menuItems.forEach(item => {
        const submenu = item.querySelector('.sub-menu');
        const icon = item.querySelector('.fas.fa-chevron-down, .fas.fa-chevron-right');
        
        if (submenu && icon) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle submenu
                submenu.classList.toggle('active');
                
                // Rotate icon
                icon.classList.toggle('rotate');
                
                // Close other open submenus
                menuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherSubmenu = otherItem.querySelector('.sub-menu');
                        const otherIcon = otherItem.querySelector('.fas.fa-chevron-down, .fas.fa-chevron-right');
                        if (otherSubmenu) {
                            otherSubmenu.classList.remove('active');
                        }
                        if (otherIcon) {
                            otherIcon.classList.remove('rotate');
                        }
                    }
                });
            });
        }
    });
});

document.querySelector('.close-notification').addEventListener('click', function() {
  const notification = document.querySelector('.maintenance-notification');
  notification.style.animation = 'slideOutToTop 0.5s ease-out forwards';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 500);
});

// Add this to your existing CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOutToTop {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
