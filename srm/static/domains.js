console.log("domains.js script loaded"); // Debugging log
const addDomainUrl = '/add_domain/'; // Define the URL for adding a domain
console.log("addDomainUrl is defined"); // Debugging log
document.addEventListener('DOMContentLoaded', function() {
    const mockDomains = [
        { id: '1', name: 'example.com', client: 'John Doe', details: 'GoDaddy', expiryDate: '2025-03-28', status: 'Active' },
        // Add more mock domains as needed
    ];

    const tableBody = document.getElementById('domains-table-body');
    mockDomains.forEach(domain => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="service-name">
                    <i class="fas fa-globe"></i>
                    <span>${domain.name}</span>
                </div>
            </td>
            <td>
                <div class="client-info">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(domain.client)}&background=random" alt="${domain.client}" class="client-avatar">
                    <span>${domain.client}</span>
                </div>
            </td>
            <td>${domain.details}</td>
            <td>
                <div class="expiry-date">
                    <i class="fas fa-calendar"></i>
                    <span>${domain.expiryDate}</span>
                </div>
            </td>
            <td><span class="status-badge ${domain.status.toLowerCase().replace(' ', '-')}">${domain.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" data-id="${domain.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" data-id="${domain.id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Modal Management
    const modal = document.getElementById('addClientModal');
    const addButton = document.querySelector('.add-client-btn');
const closeButtons = document.querySelectorAll('.close-modal');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Close button clicked"); // Debugging log
        modal.classList.remove('active');
        console.log("Modal closed"); // Additional debugging log
    });
});

    const form = document.getElementById('addDomainForm');

    addButton.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission
        const domainName = document.getElementById('domainName').value;
        const clientName = document.getElementById('clientName').value;
        const registrar = document.getElementById('registrar').value;
        const status = document.getElementById('status').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const formattedExpiryDate = new Date(expiryDate).toISOString().split('T')[0]; // Format to YYYY-MM-DD

        // Log the data being sent
        console.log({
            domain: domainName,
            client: clientName,
            registrar: registrar,
            status: status,
            expiry: expiryDate
        });

        // Send the data to the backend using fetch
        fetch(addDomainUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Include CSRF token for security
            },
            body: JSON.stringify({
                domain: domainName,
                client: clientName,
                registrar: registrar,
                status: status,
                expiry: formattedExpiryDate // Use the formatted date
            })
        })
        .then(response => {
            console.log("Response received:", response); // Log the response
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            // Update the table with the new domain
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="service-name">
                        <i class="fas fa-globe"></i>
                        <span>${data.domain}</span>
                    </div>
                </td>
                <td>
                    <div class="client-info">
                        <span>${data.client}</span>
                    </div>
                </td>
                <td>${data.registrar}</td>
                <td>
                    <div class="expiry-date">
                        <span>${data.expiry_date}</span>
                    </div>
                </td>
                <td><span class="status-badge ${data.status.toLowerCase().replace(' ', '-')}">${data.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" data-id="${data.id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" data-id="${data.id}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
            modal.classList.remove('active'); // Close the modal
            form.reset(); // Reset the form
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

        // Handle form submission here
        modal.classList.remove('active');
        form.reset();
    });

    // JavaScript for handling domain management actions

$(document).on('click', '.edit', function() {
    const domainId = $(this).data('id');
    const domainRow = $(this).closest('tr');
    $('#editDomainId').val(domainId);
    $('#editDomainName').val(domainRow.find('span').first().text());
    $('#editClientName').val(domainRow.find('.client-info span').text());
    $('#editRegistrar').val(domainRow.find('td').eq(2).text());
    $('#editStatus').val(domainRow.find('td').eq(4).text());
    $('#editExpiryDate').val(domainRow.find('td').eq(3).find('span').text());
    $('#editDomainModal').show();
});

$('#editDomainForm').on('submit', function(e) {
    e.preventDefault();
    const domainId = $('#editDomainId').val();
    const updatedData = {
        domain: $('#editDomainName').val(),
        client: $('#editClientName').val(),
        registrar: $('#editRegistrar').val(),
        status: $('#editStatus').val(),
        expiry: $('#editExpiryDate').val(),
    };

    console.log("Sending update for domain ID:", domainId, "with data:", updatedData); // Log the update data

    $.ajax({
        url: `/update_domain/${domainId}/`,
        type: 'PUT',
        contentType: 'application/json',
        headers: {
            'X-CSRFToken': getCookie('csrftoken') // Include CSRF token for security
        },
        data: JSON.stringify(updatedData),
        success: function(response) {
            console.log("Update successful:", response); // Log success response
            location.reload(); // Reload the page to see the updated data
        },
        error: function(xhr) {
            console.error('Error updating domain:', xhr); // Log the entire xhr object for debugging
            const errorMessage = xhr.responseJSON ? xhr.responseJSON.error : 'An error occurred'; // Check if responseJSON exists
            alert('Error updating domain: ' + errorMessage);
        }
    });
});

$(document).on('click', '.delete', function() {
    const domainId = $(this).data('id');
    if (confirm('Are you sure you want to delete this domain?')) {
        $.ajax({
            url: `/delete_domain/${domainId}/`,
            type: 'DELETE',
            headers: {
                'X-CSRFToken': getCookie('csrftoken') // Include CSRF token for security
            },
            success: function() {
                console.log("Domain deleted successfully"); // Log success message
                location.reload(); // Reload the page to see the updated data
            },
            error: function(xhr) {
                console.error('Error deleting domain:', xhr); // Log the entire xhr object for debugging
                const errorMessage = xhr.responseJSON ? xhr.responseJSON.error : 'An error occurred'; // Check if responseJSON exists
                alert('Error deleting domain: ' + errorMessage);
            }
        });
    }
});


// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = tableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Check if this cookie string begins with the desired name
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
}); // Closing brace for DOMContentLoaded event listener
