// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Custom cursor effect
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  document.addEventListener('mousemove', function(e) {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1
    });
    
    gsap.to(cursorFollower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3
    });
  });
  
  // Hide cursor when leaving the window
  document.addEventListener('mouseleave', function() {
    gsap.to(cursor, { opacity: 0 });
    gsap.to(cursorFollower, { opacity: 0 });
  });
  
  document.addEventListener('mouseenter', function() {
    gsap.to(cursor, { opacity: 1 });
    gsap.to(cursorFollower, { opacity: 0.5 });
  });
  
  // Add hover effect to interactive elements
  const hoverElements = document.querySelectorAll('a, button, input, select, .logo-img');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      gsap.to(cursor, { scale: 1.5, backgroundColor: 'transparent', border: '1px solid #e0c9a6', duration: 0.3 });
      gsap.to(cursorFollower, { scale: 0, opacity: 0, duration: 0.3 });
    });
    
    element.addEventListener('mouseleave', function() {
      gsap.to(cursor, { scale: 1, backgroundColor: '#e0c9a6', border: 'none', duration: 0.3 });
      gsap.to(cursorFollower, { scale: 1, opacity: 0.5, duration: 0.3 });
    });
  });
  
  // Sidebar toggle
  const toggleSidebar = document.querySelector('.toggle-sidebar');
  const sidebar = document.querySelector('.sidebar');
  
  if (toggleSidebar && sidebar) {
    toggleSidebar.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  }
  
  // Select all checkbox
  const selectAllCheckbox = document.getElementById('select-all');
  const rowCheckboxes = document.querySelectorAll('.row-select');
  
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      rowCheckboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
    });
  }
  
  // Update select all checkbox state based on row checkboxes
  if (rowCheckboxes.length > 0) {
    rowCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const allChecked = Array.from(rowCheckboxes).every(checkbox => checkbox.checked);
        const someChecked = Array.from(rowCheckboxes).some(checkbox => checkbox.checked);
        
        if (allChecked) {
          selectAllCheckbox.checked = true;
          selectAllCheckbox.indeterminate = false;
        } else if (someChecked) {
          selectAllCheckbox.checked = false;
          selectAllCheckbox.indeterminate = true;
        } else {
          selectAllCheckbox.checked = false;
          selectAllCheckbox.indeterminate = false;
        }
      });
    });
  }
  
  // Message modal functionality
  const viewButtons = document.querySelectorAll('.view-btn');
  const messageModal = document.getElementById('message-modal');
  const closeModal = document.querySelector('.close-modal');
  
  if (viewButtons.length > 0 && messageModal) {
    viewButtons.forEach(button => {
      button.addEventListener('click', function() {
        // In a real implementation, you would fetch message details
        // For now, we'll just show the modal with sample data
        messageModal.style.display = 'flex';
        
        // Get row data
        const row = this.closest('tr');
        const name = row.cells[1].textContent;
        const email = row.cells[2].textContent;
        const subject = row.cells[3].textContent;
        const date = row.cells[4].textContent;
        
        // Update modal with data
        document.getElementById('modal-name').textContent = name;
        document.getElementById('modal-email').textContent = email;
        document.getElementById('modal-date').textContent = date;
        document.getElementById('modal-subject').textContent = subject;
      });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
      messageModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === messageModal) {
        messageModal.style.display = 'none';
      }
    });
  }
  
  // Card animations
  const cards = document.querySelectorAll('.card');
  
  if (cards.length > 0) {
    cards.forEach((card, index) => {
      gsap.from(card, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });
  }
  
  // Table row hover animation
  const tableRows = document.querySelectorAll('.data-table tbody tr');
  
  if (tableRows.length > 0) {
    tableRows.forEach(row => {
      row.addEventListener('mouseenter', function() {
        gsap.to(this, {
          backgroundColor: 'rgba(224, 201, 166, 0.05)',
          duration: 0.3
        });
      });
      
      row.addEventListener('mouseleave', function() {
        gsap.to(this, {
          backgroundColor: 'transparent',
          duration: 0.3
        });
      });
    });
  }
  
  // Filter functionality
  const filterAction = document.querySelector('.filter-action');
  const dateFilter = document.getElementById('date-filter');
  const statusFilter = document.getElementById('status-filter');
  
  if (filterAction && dateFilter && statusFilter) {
    filterAction.addEventListener('click', function() {
      // In a real implementation, you would filter the table data
      // For this demo, we'll just log the selected filter values
      console.log('Filtering by:', {
        date: dateFilter.value,
        status: statusFilter.value
      });
      
      // Example of how you might filter the table rows
      tableRows.forEach(row => {
        const statusCell = row.querySelector('.status');
        const statusText = statusCell.textContent.toLowerCase();
        
        if (statusFilter.value === 'all' || statusFilter.value === statusText) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }
  
  // Modal buttons functionality
  const modalDeleteBtn = document.querySelector('.modal-footer .delete-btn');
  const modalMarkBtn = document.querySelector('.modal-footer .mark-btn');
  const modalReplyBtn = document.querySelector('.modal-footer .reply-btn');
  
  if (modalDeleteBtn) {
    modalDeleteBtn.addEventListener('click', function() {
      console.log('Delete message');
      messageModal.style.display = 'none';
    });
  }
  
  if (modalMarkBtn) {
    modalMarkBtn.addEventListener('click', function() {
      console.log('Mark as read');
      this.querySelector('span').textContent = 'Marked as Read';
      setTimeout(() => {
        this.querySelector('span').textContent = 'Mark as Read';
      }, 2000);
    });
  }
  
  if (modalReplyBtn) {
    modalReplyBtn.addEventListener('click', function() {
      console.log('Reply to message');
      // In a real implementation, you would show a reply form or redirect to a reply page
    });
  }
  
  // Pagination functionality
  const paginationButtons = document.querySelectorAll('.page-number');
  
  if (paginationButtons.length > 0) {
    paginationButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        paginationButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // In a real implementation, you would update the table with the new page data
        console.log('Go to page:', this.textContent);
      });
    });
  }
}); 