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
      sidebar.classList.toggle('collapsed');
      document.querySelector('.main-content').classList.toggle('expanded');
    });
  }
  
  // Table Select All
  const selectAll = document.getElementById('select-all');
  const rowSelects = document.querySelectorAll('.row-select');
  
  if (selectAll && rowSelects.length > 0) {
    selectAll.addEventListener('change', function() {
      rowSelects.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
      });
    });
  }
  
  // Update select all checkbox state based on row checkboxes
  if (rowSelects.length > 0) {
    rowSelects.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const allChecked = Array.from(rowSelects).every(checkbox => checkbox.checked);
        const someChecked = Array.from(rowSelects).some(checkbox => checkbox.checked);
        
        if (allChecked) {
          selectAll.checked = true;
          selectAll.indeterminate = false;
        } else if (someChecked) {
          selectAll.checked = false;
          selectAll.indeterminate = true;
        } else {
          selectAll.checked = false;
          selectAll.indeterminate = false;
        }
      });
    });
  }
  
  // Modal Functionality
  const modal = document.getElementById('message-modal');
  const closeModal = document.querySelector('.close-modal');
  const viewButtons = document.querySelectorAll('.view-btn');
  
  if (modal && closeModal) {
    // Close Modal
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    // Close when clicking outside modal content
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    // Open Modal and load contact data
    viewButtons.forEach(button => {
      button.addEventListener('click', function() {
        const contactId = button.getAttribute('data-id');
        loadContactDetails(contactId);
      });
    });
  }
  
  // Action buttons functionality
  const deleteButtons = document.querySelectorAll('.delete-btn');
  const replyButtons = document.querySelectorAll('.reply-btn');
  
  // Delete contact
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const contactId = button.closest('tr').getAttribute('data-id') || 
                        button.getAttribute('data-id');
      
      if (contactId && confirm('Are you sure you want to delete this contact?')) {
        deleteContact(contactId);
      }
    });
  });
  
  // Reply to contact
  replyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const email = button.getAttribute('data-email');
      if (email) {
        window.location.href = `mailto:${email}`;
      }
    });
  });
  
  // Modal action buttons
  const modalDeleteBtn = document.getElementById('modal-delete-btn');
  const modalMarkBtn = document.getElementById('modal-mark-btn');
  const modalReplyBtn = document.getElementById('modal-reply-btn');
  
  if (modalDeleteBtn) {
    modalDeleteBtn.addEventListener('click', function() {
      const contactId = document.getElementById('modal-contact-id').value;
      
      if (contactId && confirm('Are you sure you want to delete this contact?')) {
        deleteContact(contactId);
      }
    });
  }
  
  if (modalMarkBtn) {
    modalMarkBtn.addEventListener('click', function() {
      const contactId = document.getElementById('modal-contact-id').value;
      updateContactStatus(contactId, 'read');
    });
  }
  
  if (modalReplyBtn) {
    modalReplyBtn.addEventListener('click', function() {
      const email = document.getElementById('modal-email').textContent;
      if (email) {
        window.location.href = `mailto:${email}`;
        updateContactStatus(document.getElementById('modal-contact-id').value, 'responded');
      }
    });
  }
  
  // Filter Actions
  const filterAction = document.querySelector('.filter-action');
  if (filterAction) {
    filterAction.addEventListener('click', function() {
      // Get filter values
      const dateFilter = document.getElementById('date-filter').value;
      const statusFilter = document.getElementById('status-filter').value;
      
      // Apply filters to table
      applyFilters(dateFilter, statusFilter);
    });
  }
  
  // Functions
  
  // Load contact details into modal
  function loadContactDetails(contactId) {
    // Get contact row
    const contactRow = document.querySelector(`tr[data-id="${contactId}"]`);
    
    if (contactRow) {
      // Get data from row
      const name = contactRow.cells[1].textContent;
      const email = contactRow.cells[2].textContent;
      const service = contactRow.cells[3].textContent;
      const date = contactRow.cells[4].textContent;
      const status = contactRow.cells[5].textContent;
      
      // Fetch additional details from server
      fetch(`/admin/contacts/${contactId}`)
        .then(response => response.json())
        .then(data => {
          // Set modal values
          document.getElementById('modal-name').textContent = name;
          document.getElementById('modal-email').textContent = email;
          document.getElementById('modal-phone').textContent = data.phone || 'Not provided';
          document.getElementById('modal-date').textContent = date;
          document.getElementById('modal-service').textContent = service;
          document.getElementById('modal-message').textContent = data.message;
          document.getElementById('modal-contact-id').value = contactId;
          
          // Update button text based on status
          const markBtn = document.getElementById('modal-mark-btn');
          if (status.trim() === 'new') {
            markBtn.style.display = 'block';
            markBtn.querySelector('span').textContent = 'Mark as Read';
          } else if (status.trim() === 'read') {
            markBtn.style.display = 'block';
            markBtn.querySelector('span').textContent = 'Mark as Responded';
          } else {
            markBtn.style.display = 'none';
          }
          
          // Show modal
          modal.style.display = 'block';
          
          // If contact is new, mark it as read
          if (status.trim() === 'new') {
            updateContactStatus(contactId, 'read');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Could not load contact details');
        });
    }
  }
  
  // Delete contact
  function deleteContact(contactId) {
    fetch(`/admin/contacts/${contactId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Remove from DOM
        const row = document.querySelector(`tr[data-id="${contactId}"]`);
        if (row) {
          row.remove();
        }
        
        // Hide modal if open
        if (modal.style.display === 'block') {
          modal.style.display = 'none';
        }
        
        // Update counters
        updateCounters();
      } else {
        alert(data.message || 'Failed to delete contact');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  }
  
  // Update contact status
  function updateContactStatus(contactId, status) {
    fetch(`/admin/contacts/${contactId}/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Update UI
        const statusSpan = document.querySelector(`tr[data-id="${contactId}"] .status`);
        if (statusSpan) {
          statusSpan.className = `status ${status}`;
          statusSpan.textContent = status;
        }
        
        // Update modal button
        const markBtn = document.getElementById('modal-mark-btn');
        if (status === 'read') {
          markBtn.querySelector('span').textContent = 'Mark as Responded';
        } else if (status === 'responded') {
          markBtn.style.display = 'none';
        }
        
        // Update counters
        updateCounters();
      } else {
        alert(data.message || 'Failed to update status');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  }
  
  // Update dashboard counters
  function updateCounters() {
    fetch('/admin/dashboard/counts')
      .then(response => response.json())
      .then(data => {
        document.querySelector('.card:nth-child(1) h3').textContent = data.new;
        document.querySelector('.card:nth-child(2) h3').textContent = data.pending;
        document.querySelector('.card:nth-child(3) h3').textContent = data.responded;
      })
      .catch(error => {
        console.error('Error updating counters:', error);
      });
  }
  
  // Apply filters to table
  function applyFilters(dateFilter, statusFilter) {
    window.location.href = `/admin/dashboard/contacts?date=${dateFilter}&status=${statusFilter}`;
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

  // Add event listeners for recent contacts in the dashboard view
  const dashboardViewButtons = document.querySelectorAll('.dashboard-summary .view-btn');
  const dashboardReplyButtons = document.querySelectorAll('.dashboard-summary .reply-btn');

  // Handle view buttons in dashboard
  if (dashboardViewButtons.length > 0) {
    dashboardViewButtons.forEach(button => {
      button.addEventListener('click', function() {
        const contactId = button.getAttribute('data-id');
        loadContactDetails(contactId);
      });
    });
  }

  // Handle reply buttons in dashboard
  if (dashboardReplyButtons.length > 0) {
    dashboardReplyButtons.forEach(button => {
      button.addEventListener('click', function() {
        const email = button.getAttribute('data-email');
        if (email) {
          window.location.href = `mailto:${email}`;
        }
      });
    });
  }

  // Add hover effects to summary cards
  const summaryCards = document.querySelectorAll('.summary-card');
  if (summaryCards.length > 0) {
    summaryCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        gsap.to(this, {
          y: -5,
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', function() {
        gsap.to(this, {
          y: 0,
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          duration: 0.3
        });
      });
    });
  }

  // Add animation to quick actions
  const quickActions = document.querySelectorAll('.quick-action');
  if (quickActions.length > 0) {
    quickActions.forEach((action, index) => {
      gsap.from(action, {
        opacity: 0,
        y: 20,
        delay: 0.1 + (index * 0.1),
        duration: 0.5
      });
      
      action.addEventListener('mouseenter', function() {
        gsap.to(this, {
          y: -3,
          backgroundColor: '#2a2a2a',
          duration: 0.3
        });
      });
      
      action.addEventListener('mouseleave', function() {
        gsap.to(this, {
          y: 0,
          backgroundColor: '#252525',
          duration: 0.3
        });
      });
    });
  }
}); 