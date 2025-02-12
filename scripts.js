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
});
