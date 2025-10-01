// Global variables for optimization
        let chartsInitialized = false;
        let calendarInitialized = false;
        let financeChartsInitialized = false;
        let taskIdCounter = 10; // Starting from 10 since we already have tasks with IDs 1-9
        let transactionIdCounter = 5; // Starting from 5 since we already have transactions with IDs 1-4
        let noteIdCounter = 5; // Starting from 5 since we already have notes with IDs 1-4
        let currentUser = null;
        let currentEditingTaskId = null;
        let currentEditingTransactionId = null;
        let currentEditingNoteId = null;
        let selectedCategoryColor = '#4A6FA5';

        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize authentication
            initAuthentication();

            // Check if user is logged in
            if (currentUser) {
                showApp();
                initializeAppComponents();
            }
        });

        // Authentication functionality
        function initAuthentication() {
            const authTabs = document.querySelectorAll('.auth-tab');
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            const socialBtns = document.querySelectorAll('.social-btn');

            // Check if user is already logged in (for demo purposes)
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
            }

            // Auth tabs functionality
            authTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs
                    authTabs.forEach(t => t.classList.remove('active'));

                    // Add active class to clicked tab
                    this.classList.add('active');

                    // Show corresponding form
                    const tabName = this.getAttribute('data-tab');
                    if (tabName === 'login') {
                        loginForm.classList.add('active');
                        registerForm.classList.remove('active');
                    } else {
                        loginForm.classList.remove('active');
                        registerForm.classList.add('active');
                    }
                });
            });

            // Login form functionality
            if (loginForm) {
                loginForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    const email = this.querySelector('input[type="email"]').value;
                    const password = this.querySelector('input[type="password"]').value;

                    // For demo purposes, we'll accept any email/password combination
                    if (email && password) {
                        // Create user object
                        const user = {
                            name: 'César López',
                            email: email,
                            code: 'USR-CL-9834',
                            avatar: 'CL'
                        };

                        // Save user to localStorage
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        currentUser = user;

                        // Show app
                        showApp();

                        // Show app and initialize components
                        showApp();
                        initializeAppComponents();
                    }
                });
            }

            // Register form functionality
            if (registerForm) {
                registerForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    const name = this.querySelector('input[type="text"]').value;
                    const email = this.querySelector('input[type="email"]').value;
                    const password = this.querySelector('input[type="password"]').value;
                    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

                    // For demo purposes, we'll accept any form data
                    if (name && email && password && password === confirmPassword) {
                        // Generate user code
                        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
                        const randomCode = Math.floor(Math.random() * 10000);
                        const userCode = `USR-${initials}-${randomCode}`;

                        // Create user object
                        const user = {
                            name: name,
                            email: email,
                            code: userCode,
                            avatar: initials
                        };

                        // Save user to localStorage
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        currentUser = user;

                        // Show app and initialize components
                        showApp();
                        initializeAppComponents();
                    }
                });
            }

            // Social login functionality
            socialBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const provider = this.classList.contains('google') ? 'Google' : 'Apple';

                    // For demo purposes, we'll just create a user with the provider name
                    const user = {
                        name: `Usuario de ${provider}`,
                        email: `usuario@${provider.toLowerCase()}.com`,
                        code: `USR-${provider.substring(0, 2).toUpperCase()}-${Math.floor(Math.random() * 10000)}`,
                        avatar: provider.substring(0, 2).toUpperCase()
                    };

                    // Save user to localStorage
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    currentUser = user;

                    // Show app and initialize components
                    showApp();
                    initializeAppComponents();
                });
            });
        }

        // Initialize all app components
        function initializeAppComponents() {
            initNavigation();
            initDarkMode();
            initTaskManagement();
            initCalendar();
            initNotes();
            initSearch();
            initSortable();
            initNotifications();
            initModals();
            initProjects();
            initFinance();
            initUserManagement();
            initReports();
            initSettings();
            initProfile();
        }

        // Show app and hide auth
        function showApp() {
            const authContainer = document.getElementById('authContainer');
            const appContainer = document.getElementById('appContainer');

            if (authContainer && appContainer) {
                authContainer.style.display = 'none';
                appContainer.classList.add('active');

                // Update user profile in sidebar
                if (currentUser) {
                    const userAvatar = document.getElementById('userAvatar');
                    const userName = document.getElementById('userName');
                    const userCode = document.getElementById('userCode');
                    const avatarInitials = document.getElementById('avatarInitials');

                    if (userAvatar) userAvatar.textContent = currentUser.avatar;
                    if (userName) userName.textContent = currentUser.name;
                    if (userCode) userCode.textContent = currentUser.code;
                    if (avatarInitials) avatarInitials.textContent = currentUser.avatar;
                }
            }
        }

        // Logout functionality
        function logout() {
            localStorage.removeItem('currentUser');
            currentUser = null;

            const authContainer = document.getElementById('authContainer');
            const appContainer = document.getElementById('appContainer');

            if (authContainer && appContainer) {
                authContainer.style.display = 'flex';
                appContainer.classList.remove('active');
            }
        }

        // User profile dropdown
        function toggleUserMenu() {
            const userMenu = document.getElementById('userMenu');
            if (userMenu) {
                userMenu.style.display = userMenu.style.display === 'none' ? 'block' : 'none';
            }
        }

        // Navigation functionality
        function initNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            const userProfile = document.getElementById('userProfile');
            const logoutBtn = document.getElementById('logoutBtn');

            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();

                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));

                    // Add active class to clicked link
                    this.classList.add('active');

                    // Get page ID
                    const pageId = this.getAttribute('data-page');

                    // Hide all pages
                    document.querySelectorAll('.page-content').forEach(page => {
                        page.style.display = 'none';
                    });

                    // Show selected page
                    const selectedPage = document.getElementById(pageId);
                    if (selectedPage) {
                        selectedPage.style.display = 'block';

                        // Initialize page-specific functionality
                        switch(pageId) {
                            case 'charts':
                                if (!chartsInitialized) {
                                    initCharts();
                                    chartsInitialized = true;
                                }
                                break;
                            case 'calendar':
                                if (!calendarInitialized) {
                                    renderCalendar();
                                    calendarInitialized = true;
                                }
                                break;
                            case 'finance':
                                if (!financeChartsInitialized) {
                                    initFinanceCharts();
                                    financeChartsInitialized = true;
                                }
                                break;
                            case 'tasks':
                                // Set today's date for daily tasks
                                const today = new Date();
                                const formattedDate = today.toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                });
                                const todayDateElement = document.getElementById('todayDate');
                                if (todayDateElement) {
                                    todayDateElement.textContent = formattedDate;
                                }
                                break;
                        }
                    }
                });
            });

            // User profile dropdown
            if (userProfile) {
                userProfile.addEventListener('click', toggleUserMenu);
            }

            // Logout button
            if (logoutBtn) {
                logoutBtn.addEventListener('click', logout);
            }
        }

        // Dark mode functionality
        function initDarkMode() {
            const darkModeToggle = document.getElementById('darkModeToggle');
            const darkModeSwitch = document.getElementById('darkModeSwitch');

            function toggleDarkMode() {
                document.body.classList.toggle('dark-mode');
                const isDarkMode = document.body.classList.contains('dark-mode');

                // Update icon
                const icon = darkModeToggle.querySelector('i');
                if (icon) {
                    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
                }

                // Update switch
                if (darkModeSwitch) {
                    darkModeSwitch.checked = isDarkMode;
                }

                // Save preference to localStorage
                localStorage.setItem('darkMode', isDarkMode);
            }

            // Load saved preference
            const savedDarkMode = localStorage.getItem('darkMode') === 'true';
            if (savedDarkMode) {
                document.body.classList.add('dark-mode');
                if (darkModeToggle) {
                    darkModeToggle.querySelector('i').className = 'fas fa-sun';
                }
                if (darkModeSwitch) {
                    darkModeSwitch.checked = true;
                }
            }

            // Add event listeners
            if (darkModeToggle) {
                darkModeToggle.addEventListener('click', toggleDarkMode);
            }

            if (darkModeSwitch) {
                darkModeSwitch.addEventListener('change', toggleDarkMode);
            }
        }

        // Profile functionality
        function initProfile() {
            const profileMenuItem = document.getElementById('profileMenuItem');
            const settingsMenuItem = document.getElementById('settingsMenuItem');
            const avatarUpload = document.getElementById('avatarUpload');
            const avatarInput = document.getElementById('avatarInput');

            // Profile menu item
            if (profileMenuItem) {
                profileMenuItem.addEventListener('click', function() {
                    // Navigate to settings page
                    const settingsLink = document.querySelector('[data-page="settings"]');
                    if (settingsLink) {
                        settingsLink.click();
                    }

                    // Close user menu
                    const userMenu = document.getElementById('userMenu');
                    if (userMenu) {
                        userMenu.style.display = 'none';
                    }
                });
            }

            // Settings menu item
            if (settingsMenuItem) {
                settingsMenuItem.addEventListener('click', function() {
                    // Navigate to settings page
                    const settingsLink = document.querySelector('[data-page="settings"]');
                    if (settingsLink) {
                        settingsLink.click();
                    }

                    // Close user menu
                    const userMenu = document.getElementById('userMenu');
                    if (userMenu) {
                        userMenu.style.display = 'none';
                    }
                });
            }

            // Avatar upload
            if (avatarUpload && avatarInput) {
                avatarUpload.addEventListener('click', function() {
                    avatarInput.click();
                });

                avatarInput.addEventListener('change', function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const userAvatar = document.getElementById('userAvatar');
                            if (userAvatar) {
                                userAvatar.innerHTML = `<img src="${e.target.result}" alt="Avatar">`;
                            }

                            // Save avatar to localStorage
                            localStorage.setItem('userAvatar', e.target.result);
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }

            // Load saved avatar
            const savedAvatar = localStorage.getItem('userAvatar');
            if (savedAvatar) {
                const userAvatar = document.getElementById('userAvatar');
                if (userAvatar) {
                    userAvatar.innerHTML = `<img src="${savedAvatar}" alt="Avatar">`;
                }
            }
        }

        function updateTaskElement(taskElement, taskData) {
            const { title, description, startDate, endDate, priority, category } = taskData;

            taskElement.setAttribute('data-priority', priority);
            taskElement.setAttribute('data-start-date', startDate);
            taskElement.setAttribute('data-end-date', endDate);

            // Update task content
            const taskTitle = taskElement.querySelector('.task-title');
            const taskDescription = taskElement.querySelector('.task-description');
            const taskDates = taskElement.querySelector('.task-dates');
            const taskPriority = taskElement.querySelector('.task-priority');
            const taskCategory = taskElement.querySelector('.task-category');

            if (taskTitle) taskTitle.textContent = title;
            if (taskDescription) taskDescription.textContent = description;
            if (taskDates) taskDates.textContent = `Inicio: ${utils.formatDate(startDate)} | Fin: ${utils.formatDate(endDate)}`;

            // Update priority class and text
            if (taskPriority) {
                taskPriority.className = `task-priority priority-${priority}`;
                taskPriority.textContent = priority === 'high' ? 'Alta' : priority === 'medium' ? 'Media' : 'Baja';
            }

            // Update category text
            if (taskCategory) {
                taskCategory.textContent = utils.getCategoryName(category);
            }

            // Update high priority class
            if (priority === 'high') {
                taskElement.classList.add('high-priority');
            } else {
                taskElement.classList.remove('high-priority');
            }
        }

        function addEventListenersToTask(taskElement) {
            const taskId = taskElement.getAttribute('data-task-id');

            const checkbox = taskElement.querySelector('.task-checkbox');
            if (checkbox) {
                checkbox.addEventListener('click', () => handleTaskCheckbox(checkbox));
            }

            const editBtn = taskElement.querySelector('.task-action-btn.edit');
            if (editBtn) {
                editBtn.addEventListener('click', () => openEditTaskForm(taskId));
            }

            const deleteBtn = taskElement.querySelector('.task-action-btn.delete');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => deleteTask(taskId));
            }
        }

        function createTaskElement(task) {
            const { id, title, description, startDate, endDate, priority, category } = task;
            const priorityClass = `priority-${priority}`;
            const priorityText = priority === 'high' ? 'Alta' : priority === 'medium' ? 'Media' : 'Baja';
            const categoryText = utils.getCategoryName(category);

            const taskElement = document.createElement('div');
            taskElement.className = 'task-item fade-in';
            taskElement.setAttribute('data-priority', priority);
            taskElement.setAttribute('data-task-id', id);
            taskElement.setAttribute('data-start-date', startDate);
            taskElement.setAttribute('data-end-date', endDate);
            taskElement.innerHTML = `
                <div class="task-checkbox"></div>
                <div class="task-content">
                    <div class="task-title">${title}</div>
                    <div class="task-description">${description}</div>
                    <div class="task-dates">Inicio: ${utils.formatDate(startDate)} | Fin: ${utils.formatDate(endDate)}</div>
                </div>
                <div class="task-priority ${priorityClass}">${priorityText}</div>
                <div class="task-category">${categoryText}</div>
                <div class="task-actions">
                    <button class="task-action-btn edit" data-task-id="${id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-action-btn delete" data-task-id="${id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            addEventListenersToTask(taskElement);

            return taskElement;
        }

        // Task management functionality
        function initTaskManagement() {
            // Task subsections functionality
            const subsectionCards = document.querySelectorAll('.subsection-card');

            subsectionCards.forEach(card => {
                card.addEventListener('click', function() {
                    // Remove active class from all cards
                    subsectionCards.forEach(c => c.classList.remove('active'));

                    // Add active class to clicked card
                    this.classList.add('active');

                    // Hide all subsection contents
                    document.querySelectorAll('.subsection-content').forEach(content => {
                        content.style.display = 'none';
                    });

                    // Show selected subsection
                    const subsection = this.getAttribute('data-subsection');
                    const subsectionContent = document.getElementById(subsection + 'Tasks');
                    if (subsectionContent) {
                        subsectionContent.style.display = 'block';
                    }

                    // If category subsection is selected, populate with work tasks by default
                    if (subsection === 'category') {
                        populateCategoryTasks('work');
                    }
                });
            });

            // Task form functionality
            const newTaskBtn = document.getElementById('newTaskBtn');
            const taskForm = document.getElementById('taskForm');
            const saveTaskBtn = document.getElementById('saveTaskBtn');
            const cancelTaskBtn = document.getElementById('cancelTaskBtn');
            const taskList = document.getElementById('taskList');

            if (newTaskBtn && taskForm && saveTaskBtn && cancelTaskBtn) {
                newTaskBtn.addEventListener('click', function() {
                    taskForm.classList.add('active');
                });

                cancelTaskBtn.addEventListener('click', function() {
                    taskForm.classList.remove('active');
                    // Clear form
                    const titleInput = document.getElementById('taskTitle');
                    const descriptionInput = document.getElementById('taskDescription');
                    const startDateInput = document.getElementById('taskStartDate');
                    const endDateInput = document.getElementById('taskEndDate');

                    if (titleInput) titleInput.value = '';
                    if (descriptionInput) descriptionInput.value = '';
                    if (startDateInput) startDateInput.value = '';
                    if (endDateInput) endDateInput.value = '';
                });

                saveTaskBtn.addEventListener('click', function() {
                    const titleInput = document.getElementById('taskTitle');
                    const descriptionInput = document.getElementById('taskDescription');
                    const categoryInput = document.getElementById('taskCategory');
                    const startDateInput = document.getElementById('taskStartDate');
                    const endDateInput = document.getElementById('taskEndDate');
                    const priorityInput = document.getElementById('taskPriority');

                    const title = titleInput ? titleInput.value : '';
                    const description = descriptionInput ? descriptionInput.value : '';
                    const category = categoryInput ? categoryInput.value : '';
                    const startDate = startDateInput ? startDateInput.value : '';
                    const endDate = endDateInput ? endDateInput.value : '';
                    const priority = priorityInput ? priorityInput.value : '';

                    if (title && startDate && endDate && taskList) {
                        const taskId = taskIdCounter++;
                        const taskData = {
                            id: taskId,
                            title,
                            description,
                            startDate,
                            endDate,
                            priority,
                            category
                        };

                        const newTaskElement = createTaskElement(taskData);
                        taskList.prepend(newTaskElement);

                        // Check if task is high priority and for today
                        const today = new Date().toISOString().split('T')[0];
                        if (priority === 'high' && startDate === today) {
                            // Add to dashboard
                            addToDashboard(newTaskElement);

                            // Show notification
                            showNotification('Nueva tarea urgente agregada');
                        }

                        // Close form and reset
                        taskForm.classList.remove('active');
                        titleInput.value = '';
                        descriptionInput.value = '';
                        startDateInput.value = '';
                        endDateInput.value = '';

                        // Update calendar if initialized
                        if (calendarInitialized) {
                            renderCalendar();
                        }
                    }
                });
            }

            // Edit task form functionality
            const editTaskForm = document.getElementById('editTaskForm');
            const updateTaskBtn = document.getElementById('updateTaskBtn');
            const cancelEditTaskBtn = document.getElementById('cancelEditTaskBtn');

            if (editTaskForm && updateTaskBtn && cancelEditTaskBtn) {
                cancelEditTaskBtn.addEventListener('click', function() {
                    editTaskForm.classList.remove('active');
                    currentEditingTaskId = null;
                });

                updateTaskBtn.addEventListener('click', function() {
                    const titleInput = document.getElementById('editTaskTitle');
                    const descriptionInput = document.getElementById('editTaskDescription');
                    const categoryInput = document.getElementById('editTaskCategory');
                    const startDateInput = document.getElementById('editTaskStartDate');
                    const endDateInput = document.getElementById('editTaskEndDate');
                    const priorityInput = document.getElementById('editTaskPriority');

                    const title = titleInput ? titleInput.value : '';
                    const description = descriptionInput ? descriptionInput.value : '';
                    const category = categoryInput ? categoryInput.value : '';
                    const startDate = startDateInput ? startDateInput.value : '';
                    const endDate = endDateInput ? endDateInput.value : '';
                    const priority = priorityInput ? priorityInput.value : '';

                    if (title && startDate && endDate && currentEditingTaskId) {
                        // Find the task element
                        const taskElement = document.querySelector(`[data-task-id="${currentEditingTaskId}"]`);
                        if (taskElement) {
                            const taskData = {
                                title,
                                description,
                                startDate,
                                endDate,
                                priority,
                                category
                            };
                            updateTaskElement(taskElement, taskData);

                            // Update dashboard if needed
                            const today = new Date().toISOString().split('T')[0];
                            if (priority === 'high' && startDate === today) {
                                // Check if task is already in dashboard
                                const dashboardTask = document.querySelector(`#highPriorityTasks [data-task-id="${currentEditingTaskId}"]`);
                                if (!dashboardTask) {
                                    addToDashboard(taskElement);
                                }
                            } else {
                                // Remove from dashboard if it was there
                                const dashboardTask = document.querySelector(`#highPriorityTasks [data-task-id="${currentEditingTaskId}"]`);
                                if (dashboardTask) {
                                    dashboardTask.remove();
                                    updateUrgentTasksCount();
                                }
                            }
                        }

                        // Close form and reset
                        editTaskForm.classList.remove('active');
                        currentEditingTaskId = null;

                        // Update calendar if initialized
                        if (calendarInitialized) {
                            renderCalendar();
                        }

                        // Show notification
                        showNotification('Tarea actualizada correctamente');
                    }
                });
            }

            // Initialize filter buttons
            initFilterButtons();

            // Initialize sort completed tasks
            initSortCompletedTasks();

            // Add event listeners to initial tasks
            document.querySelectorAll('.task-item').forEach(taskElement => {
                addEventListenersToTask(taskElement);
            });
        }

        // Open edit task form
        function openEditTaskForm(taskId) {
            const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
            if (!taskElement) return;

            const editTaskForm = document.getElementById('editTaskForm');
            const titleInput = document.getElementById('editTaskTitle');
            const descriptionInput = document.getElementById('editTaskDescription');
            const categoryInput = document.getElementById('editTaskCategory');
            const startDateInput = document.getElementById('editTaskStartDate');
            const endDateInput = document.getElementById('editTaskEndDate');
            const priorityInput = document.getElementById('editTaskPriority');

            if (!editTaskForm || !titleInput || !descriptionInput || !categoryInput || !startDateInput || !endDateInput || !priorityInput) return;

            // Get current task values
            const taskTitle = taskElement.querySelector('.task-title').textContent;
            const taskDescription = taskElement.querySelector('.task-description').textContent;
            const taskCategoryText = taskElement.querySelector('.task-category').textContent;
            const taskDatesText = taskElement.querySelector('.task-dates').textContent;
            const taskPriorityClass = taskElement.querySelector('.task-priority').className;

            // Extract dates from text
            const datesMatch = taskDatesText.match(/Inicio: (\d{2}\/\d{2}\/\d{4}) \| Fin: (\d{2}\/\d{2}\/\d{4})/);
            if (datesMatch) {
                const startDate = utils.parseDate(datesMatch[1]);
                const endDate = utils.parseDate(datesMatch[2]);

                if (startDateInput) startDateInput.value = startDate;
                if (endDateInput) endDateInput.value = endDate;
            }

            // Extract priority from class
            let priority = 'medium';
            if (taskPriorityClass.includes('priority-high')) priority = 'high';
            else if (taskPriorityClass.includes('priority-low')) priority = 'low';

            // Extract category from text
            let category = 'work';
            if (taskCategoryText === 'Personal') category = 'personal';
            else if (taskCategoryText === 'Salud') category = 'health';
            else if (taskCategoryText === 'Estudio') category = 'study';
            else if (taskCategoryText === 'Otros') category = 'other';

            // Set form values
            if (titleInput) titleInput.value = taskTitle;
            if (descriptionInput) descriptionInput.value = taskDescription;
            if (categoryInput) categoryInput.value = category;
            if (priorityInput) priorityInput.value = priority;

            // Set current editing task ID
            currentEditingTaskId = taskId;

            // Show form
            editTaskForm.classList.add('active');
        }

        // Delete task
        function deleteTask(taskId) {
            const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
            if (!taskElement) return;

            // Remove from dashboard if it's there
            const dashboardTask = document.querySelector(`#highPriorityTasks [data-task-id="${taskId}"]`);
            if (dashboardTask) {
                dashboardTask.remove();
                updateUrgentTasksCount();
            }

            // Remove from all task lists
            const allTaskElements = document.querySelectorAll(`[data-task-id="${taskId}"]`);
            allTaskElements.forEach(element => {
                element.style.opacity = '0';
                setTimeout(() => {
                    element.remove();
                }, 300);
            });

            // Update calendar if initialized
            if (calendarInitialized) {
                renderCalendar();
            }

            // Show notification
            showNotification('Tarea eliminada correctamente');
        }

        // Handle task checkbox click
        function handleTaskCheckbox(checkbox) {
            checkbox.classList.toggle('checked');

            // Move to completed tasks if checked
            if (checkbox.classList.contains('checked')) {
                const taskItem = checkbox.closest('.task-item');
                const completedTaskList = document.getElementById('completedTaskList');

                if (taskItem && completedTaskList) {
                    // Clone task for completed list
                    const completedTask = taskItem.cloneNode(true);
                    const taskDates = completedTask.querySelector('.task-dates');
                    if (taskDates) {
                        taskDates.textContent = `Completada: ${new Date().toLocaleDateString()}`;
                    }
                    completedTaskList.prepend(completedTask);

                    // Add checkbox functionality to completed task
                    const completedCheckbox = completedTask.querySelector('.task-checkbox');
                    if (completedCheckbox) {
                        completedCheckbox.addEventListener('click', function() {
                            this.classList.toggle('checked');
                        });
                    }

                    // Check if task is in dashboard and remove it
                    const taskId = taskItem.getAttribute('data-task-id');
                    if (taskId) {
                        const dashboardTask = document.querySelector(`#highPriorityTasks [data-task-id="${taskId}"]`);
                        if (dashboardTask) {
                            dashboardTask.style.opacity = '0';
                            setTimeout(() => {
                                dashboardTask.remove();
                                updateUrgentTasksCount();
                            }, 300);
                        }
                    }

                    // Hide original task
                    setTimeout(() => {
                        taskItem.style.opacity = '0';
                        setTimeout(() => {
                            taskItem.style.display = 'none';
                        }, 300);
                    }, 500);

                    // Update charts if initialized
                    if (chartsInitialized) {
                        updateCharts();
                    }
                }
            }
        }

        // Add task to dashboard
        function addToDashboard(taskElement) {
            const highPriorityTasks = document.getElementById('highPriorityTasks');
            if (highPriorityTasks) {
                // Clone the task for dashboard
                const dashboardTask = taskElement.cloneNode(true);

                // Add high priority class if not already
                if (!dashboardTask.classList.contains('high-priority')) {
                    dashboardTask.classList.add('high-priority');
                }

                // Add alert icon if not already
                const taskTitle = dashboardTask.querySelector('.task-title');
                if (taskTitle && !taskTitle.querySelector('.alert-icon')) {
                    const alertIcon = document.createElement('i');
                    alertIcon.className = 'fas fa-exclamation-circle alert-icon';
                    taskTitle.appendChild(alertIcon);
                }

                // Update dates to show "Hoy"
                const taskDates = dashboardTask.querySelector('.task-dates');
                if (taskDates) {
                    taskDates.textContent = 'Hoy';
                }

                // Add checkbox functionality
                const checkbox = dashboardTask.querySelector('.task-checkbox');
                if (checkbox) {
                    checkbox.addEventListener('click', function() {
                        handleTaskCheckbox(this);
                    });
                }

                // Add edit functionality
                const editBtn = dashboardTask.querySelector('.task-action-btn.edit');
                if (editBtn) {
                    editBtn.addEventListener('click', function() {
                        const taskId = this.getAttribute('data-task-id');
                        openEditTaskForm(taskId);
                    });
                }

                // Add delete functionality
                const deleteBtn = dashboardTask.querySelector('.task-action-btn.delete');
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', function() {
                        const taskId = this.getAttribute('data-task-id');
                        deleteTask(taskId);
                    });
                }

                // Add to dashboard
                highPriorityTasks.prepend(dashboardTask);

                // Update count
                updateUrgentTasksCount();
            }
        }

        // Update urgent tasks count
        function updateUrgentTasksCount() {
            const urgentTasksCount = document.getElementById('urgentTasksCount');
            const highPriorityTasks = document.querySelectorAll('#highPriorityTasks .task-item').length;

            if (urgentTasksCount) {
                urgentTasksCount.textContent = highPriorityTasks;
            }
        }

        // Initialize filter buttons
        function initFilterButtons() {
            const filterBtns = document.querySelectorAll('.filter-btn');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const parent = this.closest('.priority-filter, .category-filter');
                    if (parent) {
                        // Remove active class from all filter buttons in the same container
                        parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));

                        // Add active class to clicked button
                        this.classList.add('active');

                        // Get filter value
                        const filter = this.getAttribute('data-filter') || this.getAttribute('data-category');

                        // Handle category filter
                        if (this.closest('#categoryTasks')) {
                            populateCategoryTasks(filter);
                            return;
                        }

                        // Get the task list to filter
                        let taskList;
                        if (this.closest('#generalTasks')) {
                            taskList = document.getElementById('taskList');
                        } else if (this.closest('#completedTasks')) {
                            taskList = document.getElementById('completedTaskList');
                        } else if (this.closest('#pendingTasks')) {
                            taskList = document.getElementById('pendingTaskList');
                        } else if (this.closest('#highPriorityTasks')) {
                            taskList = document.getElementById('highPriorityTasks');
                        }

                        if (taskList) {
                            // Filter tasks
                            const tasks = taskList.querySelectorAll('.task-item');
                            tasks.forEach(task => {
                                if (filter === 'all') {
                                    task.style.display = 'flex';
                                } else {
                                    const priority = task.getAttribute('data-priority');
                                    if (priority === filter) {
                                        task.style.display = 'flex';
                                    } else {
                                        task.style.display = 'none';
                                    }
                                }
                            });
                        }
                    }
                });
            });
        }

        // Initialize sort completed tasks
        function initSortCompletedTasks() {
            const sortCompletedTasks = document.getElementById('sortCompletedTasks');

            if (sortCompletedTasks) {
                sortCompletedTasks.addEventListener('change', function() {
                    const sortBy = this.value;
                    const completedTaskList = document.getElementById('completedTaskList');

                    if (completedTaskList) {
                        const tasks = Array.from(completedTaskList.querySelectorAll('.task-item'));

                        tasks.sort((a, b) => {
                            if (sortBy === 'date') {
                                const dateA = new Date(a.querySelector('.task-dates').textContent.replace('Completada: ', ''));
                                const dateB = new Date(b.querySelector('.task-dates').textContent.replace('Completada: ', ''));
                                return dateB - dateA; // Newest first
                            } else if (sortBy === 'priority') {
                                const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
                                const priorityA = priorityOrder[a.getAttribute('data-priority')];
                                const priorityB = priorityOrder[b.getAttribute('data-priority')];
                                return priorityA - priorityB;
                            } else if (sortBy === 'category') {
                                const categoryA = a.querySelector('.task-category').textContent;
                                const categoryB = b.querySelector('.task-category').textContent;
                                return categoryA.localeCompare(categoryB);
                            }
                        });

                        // Reorder tasks in the DOM
                        tasks.forEach(task => {
                            completedTaskList.appendChild(task);
                        });
                    }
                });
            }
        }

        // Function to populate category tasks
        function populateCategoryTasks(category) {
            const categoryTaskList = document.getElementById('categoryTaskList');

            if (categoryTaskList) {
                categoryTaskList.innerHTML = '';

                // Get all tasks from general tasks
                const allTasks = document.querySelectorAll('#taskList .task-item');

                allTasks.forEach(task => {
                    const taskCategoryElement = task.querySelector('.task-category');
                    if (taskCategoryElement) {
                        const taskCategory = taskCategoryElement.textContent;
                        const categoryName = utils.getCategoryName(category);

                        if (taskCategory === categoryName) {
                            const clonedTask = task.cloneNode(true);

                            // Add checkbox functionality
                            const checkbox = clonedTask.querySelector('.task-checkbox');
                            if (checkbox) {
                                checkbox.addEventListener('click', function() {
                                    handleTaskCheckbox(this);
                                });
                            }

                            // Add edit functionality
                            const editBtn = clonedTask.querySelector('.task-action-btn.edit');
                            if (editBtn) {
                                editBtn.addEventListener('click', function() {
                                    const taskId = this.getAttribute('data-task-id');
                                    openEditTaskForm(taskId);
                                });
                            }

                            // Add delete functionality
                            const deleteBtn = clonedTask.querySelector('.task-action-btn.delete');
                            if (deleteBtn) {
                                deleteBtn.addEventListener('click', function() {
                                    const taskId = this.getAttribute('data-task-id');
                                    deleteTask(taskId);
                                });
                            }

                            categoryTaskList.appendChild(clonedTask);
                        }
                    }
                });
            }
        }

        // Calendar functionality
        function initCalendar() {
            const yearSelect = document.getElementById('yearSelect');
            const monthSelect = document.getElementById('monthSelect');
            const prevYearBtn = document.getElementById('prevYear');
            const nextYearBtn = document.getElementById('nextYear');
            const prevMonthBtn = document.getElementById('prevMonth');
            const nextMonthBtn = document.getElementById('nextMonth');
            const viewBtns = document.querySelectorAll('.view-btn');

            if (!yearSelect || !monthSelect || !prevYearBtn || !nextYearBtn || !prevMonthBtn || !nextMonthBtn) {
                return;
            }

            // Populate year select (1995-2040)
            for (let year = 1995; year <= 2040; year++) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            }

            // Set current year and month
            const currentDate = new Date();
            yearSelect.value = currentDate.getFullYear();
            monthSelect.value = currentDate.getMonth();

            // Event listeners
            yearSelect.addEventListener('change', renderCalendar);
            monthSelect.addEventListener('change', renderCalendar);

            prevYearBtn.addEventListener('click', function() {
                yearSelect.value = parseInt(yearSelect.value) - 1;
                renderCalendar();
            });

            nextYearBtn.addEventListener('click', function() {
                yearSelect.value = parseInt(yearSelect.value) + 1;
                renderCalendar();
            });

            prevMonthBtn.addEventListener('click', function() {
                if (parseInt(monthSelect.value) === 0) {
                    monthSelect.value = 11;
                    yearSelect.value = parseInt(yearSelect.value) - 1;
                } else {
                    monthSelect.value = parseInt(monthSelect.value) - 1;
                }
                renderCalendar();
            });

            nextMonthBtn.addEventListener('click', function() {
                if (parseInt(monthSelect.value) === 11) {
                    monthSelect.value = 0;
                    yearSelect.value = parseInt(yearSelect.value) + 1;
                } else {
                    monthSelect.value = parseInt(monthSelect.value) + 1;
                }
                renderCalendar();
            });

            // View toggle
            viewBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    viewBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    renderCalendar();
                });
            });
        }

        // Function to render calendar
        function renderCalendar() {
            const yearSelect = document.getElementById('yearSelect');
            const monthSelect = document.getElementById('monthSelect');
            const calendarView = document.getElementById('calendarView');
            const activeView = document.querySelector('.view-btn.active');

            if (!yearSelect || !monthSelect || !calendarView || !activeView) {
                return;
            }

            const year = parseInt(yearSelect.value);
            const month = parseInt(monthSelect.value);
            const view = activeView.getAttribute('data-view');

            // Clear calendar view
            calendarView.innerHTML = '';

            if (view === 'month') {
                renderMonthView(year, month, calendarView);
            } else if (view === 'week') {
                renderWeekView(year, month, calendarView);
            } else if (view === 'day') {
                renderDayView(year, month, calendarView);
            }
        }

        // Function to render month view
        function renderMonthView(year, month, calendarView) {
            const calendarGrid = document.createElement('div');
            calendarGrid.className = 'calendar-grid';
            calendarView.appendChild(calendarGrid);

            // Add day headers
            const dayHeaders = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
            dayHeaders.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'calendar-day-header';
                dayHeader.textContent = day;
                calendarGrid.appendChild(dayHeader);
            });

            // Get first day of month and number of days
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            // Get days in previous month
            const daysInPrevMonth = new Date(year, month, 0).getDate();

            // Add empty cells for days before the first day of the month
            for (let i = firstDay - 1; i >= 0; i--) {
                const day = document.createElement('div');
                day.className = 'calendar-day other-month';
                day.textContent = daysInPrevMonth - i;
                calendarGrid.appendChild(day);
            }

            // Get all tasks to display on calendar
            const allTasks = document.querySelectorAll('#taskList .task-item');

            // Add days of the month
            const currentDate = new Date();
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;

                // Format date for comparison
                const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                // Check if today
                if (year === currentDate.getFullYear() &&
                    month === currentDate.getMonth() &&
                    day === currentDate.getDate()) {
                    dayElement.classList.add('today');
                }

                // Check if there are tasks for this day
                let hasTask = false;
                const taskPriorities = [];

                allTasks.forEach(task => {
                    const startDate = task.getAttribute('data-start-date');
                    const endDate = task.getAttribute('data-end-date');
                    const priority = task.getAttribute('data-priority');

                    if (startDate && endDate) {
                        // Check if the task spans this day
                        const taskStart = new Date(startDate);
                        const taskEnd = new Date(endDate);
                        const currentDay = new Date(year, month, day);

                        if (currentDay >= taskStart && currentDay <= taskEnd) {
                            hasTask = true;
                            if (!taskPriorities.includes(priority)) {
                                taskPriorities.push(priority);
                            }
                        }
                    }
                });

                if (hasTask) {
                    dayElement.classList.add('has-task');

                    // Add task indicators
                    taskPriorities.forEach(priority => {
                        const indicator = document.createElement('div');
                        indicator.className = `task-indicator ${priority}`;
                        dayElement.appendChild(indicator);
                    });
                }

                // Add click event to show day details
                dayElement.addEventListener('click', function() {
                    showDayTasks(year, month, day);
                });

                calendarGrid.appendChild(dayElement);
            }

            // Add empty cells for days after the last day of the month
            const totalCells = calendarGrid.children.length - 7; // Subtract day headers
            const remainingCells = 42 - totalCells; // 6 rows * 7 days = 42 cells

            for (let i = 1; i <= remainingCells; i++) {
                const day = document.createElement('div');
                day.className = 'calendar-day other-month';
                day.textContent = i;
                calendarGrid.appendChild(day);
            }
        }

        // Function to render week view
        function renderWeekView(year, month, calendarView) {
            const calendarWeekView = document.createElement('div');
            calendarWeekView.className = 'calendar-week-view';
            calendarView.appendChild(calendarWeekView);

            // Add time column header
            const timeHeader = document.createElement('div');
            timeHeader.className = 'week-time';
            timeHeader.textContent = 'Hora';
            calendarWeekView.appendChild(timeHeader);

            // Add day headers
            const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            dayNames.forEach(dayName => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'week-day-header';
                dayHeader.textContent = dayName;
                calendarWeekView.appendChild(dayHeader);
            });

            // Get all tasks to display on calendar
            const allTasks = document.querySelectorAll('#taskList .task-item');

            // Add time slots and day cells
            const today = new Date();
            for (let hour = 8; hour <= 20; hour++) {
                // Time label
                const timeLabel = document.createElement('div');
                timeLabel.className = 'week-time';
                timeLabel.textContent = `${hour}:00`;
                calendarWeekView.appendChild(timeLabel);

                // Day cells
                for (let day = 0; day < 7; day++) {
                    const dayCell = document.createElement('div');
                    dayCell.className = 'week-day';

                    // Check if today
                    if (year === today.getFullYear() &&
                        month === today.getMonth() &&
                        day === today.getDay() &&
                        hour === today.getHours()) {
                        dayCell.classList.add('today');
                    }

                    // Check if there are tasks for this day and hour
                    allTasks.forEach(task => {
                        const startDate = task.getAttribute('data-start-date');
                        const endDate = task.getAttribute('data-end-date');
                        const taskTitle = task.querySelector('.task-title').textContent;

                        if (startDate && endDate) {
                            // Check if the task spans this day
                            const taskStart = new Date(startDate);
                            const taskEnd = new Date(endDate);

                            // For simplicity, we'll just add tasks to random hours
                            if (Math.random() > 0.8 && hour >= 9 && hour <= 18) {
                                const task = document.createElement('div');
                                task.className = 'week-task';
                                task.textContent = taskTitle;
                                task.draggable = true;
                                dayCell.appendChild(task);
                            }
                        }
                    });

                    calendarWeekView.appendChild(dayCell);
                }
            }

            // Make tasks draggable
            const draggableTasks = calendarWeekView.querySelectorAll('.week-task');
            draggableTasks.forEach(task => {
                task.addEventListener('dragstart', function(e) {
                    e.dataTransfer.setData('text/plain', 'task');
                });
            });

            // Make day cells drop targets
            const dropTargets = calendarWeekView.querySelectorAll('.week-day');
            dropTargets.forEach(target => {
                target.addEventListener('dragover', function(e) {
                    e.preventDefault();
                });

                target.addEventListener('drop', function(e) {
                    e.preventDefault();
                    const data = e.dataTransfer.getData('text/plain');
                    if (data === 'task') {
                        const newTask = document.createElement('div');
                        newTask.className = 'week-task';
                        newTask.textContent = 'Reunión';
                        newTask.draggable = true;
                        this.appendChild(newTask);

                        // Add drag functionality to new task
                        newTask.addEventListener('dragstart', function(e) {
                            e.dataTransfer.setData('text/plain', 'task');
                        });
                    }
                });
            });
        }

        // Function to render day view
        function renderDayView(year, month, calendarView) {
            const calendarDayView = document.createElement('div');
            calendarDayView.className = 'calendar-day-view';
            calendarView.appendChild(calendarDayView);

            // Get all tasks to display on calendar
            const allTasks = document.querySelectorAll('#taskList .task-item');

            // Add time slots
            for (let hour = 8; hour <= 20; hour++) {
                const dayHour = document.createElement('div');
                dayHour.className = 'day-hour';

                const hourLabel = document.createElement('div');
                hourLabel.className = 'hour-label';
                hourLabel.textContent = `${hour}:00`;
                dayHour.appendChild(hourLabel);

                const hourContent = document.createElement('div');
                hourContent.className = 'hour-content';

                // Check if there are tasks for this hour
                allTasks.forEach(task => {
                    const startDate = task.getAttribute('data-start-date');
                    const endDate = task.getAttribute('data-end-date');
                    const taskTitle = task.querySelector('.task-title').textContent;

                    if (startDate && endDate) {
                        // For simplicity, we'll just add tasks to random hours
                        if (Math.random() > 0.7 && hour >= 9 && hour <= 18) {
                            const task = document.createElement('div');
                            task.className = 'day-task';
                            task.textContent = taskTitle;
                            task.draggable = true;
                            hourContent.appendChild(task);
                        }
                    }
                });

                dayHour.appendChild(hourContent);
                calendarDayView.appendChild(dayHour);
            }

            // Make tasks draggable
            const draggableTasks = calendarDayView.querySelectorAll('.day-task');
            draggableTasks.forEach(task => {
                task.addEventListener('dragstart', function(e) {
                    e.dataTransfer.setData('text/plain', 'task');
                });
            });

            // Make hour cells drop targets
            const dropTargets = calendarDayView.querySelectorAll('.hour-content');
            dropTargets.forEach(target => {
                target.addEventListener('dragover', function(e) {
                    e.preventDefault();
                });

                target.addEventListener('drop', function(e) {
                    e.preventDefault();
                    const data = e.dataTransfer.getData('text/plain');
                    if (data === 'task') {
                        const newTask = document.createElement('div');
                        newTask.className = 'day-task';
                        newTask.textContent = 'Reunión';
                        newTask.draggable = true;
                        this.appendChild(newTask);

                        // Add drag functionality to new task
                        newTask.addEventListener('dragstart', function(e) {
                            e.dataTransfer.setData('text/plain', 'task');
                        });
                    }
                });
            });
        }

        // Function to show tasks for a specific day
        function showDayTasks(year, month, day) {
            const modal = document.getElementById('calendarDayModal');
            const modalDayTitle = document.getElementById('modalDayTitle');
            const modalDayTasks = document.getElementById('modalDayTasks');

            if (modal && modalDayTitle && modalDayTasks) {
                // Format date for display
                const date = new Date(year, month, day);
                const formattedDate = date.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                modalDayTitle.textContent = `Tareas del ${formattedDate}`;

                // Clear previous tasks
                modalDayTasks.innerHTML = '';

                // Format date for comparison
                const formattedDateCompare = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                // Get all tasks
                const allTasks = document.querySelectorAll('#taskList .task-item');

                // Check each task to see if it falls on this day
                allTasks.forEach(task => {
                    const startDate = task.getAttribute('data-start-date');
                    const endDate = task.getAttribute('data-end-date');

                    if (startDate && endDate) {
                        // Check if the task spans this day
                        const taskStart = new Date(startDate);
                        const taskEnd = new Date(endDate);
                        const currentDay = new Date(year, month, day);

                        if (currentDay >= taskStart && currentDay <= taskEnd) {
                            // Clone task for modal
                            const modalTask = task.cloneNode(true);

                            // Add checkbox functionality
                            const checkbox = modalTask.querySelector('.task-checkbox');
                            if (checkbox) {
                                checkbox.addEventListener('click', function() {
                                    handleTaskCheckbox(this);
                                });
                            }

                            // Add edit functionality
                            const editBtn = modalTask.querySelector('.task-action-btn.edit');
                            if (editBtn) {
                                editBtn.addEventListener('click', function() {
                                    const taskId = this.getAttribute('data-task-id');
                                    openEditTaskForm(taskId);
                                    modal.classList.remove('active');
                                });
                            }

                            // Add delete functionality
                            const deleteBtn = modalTask.querySelector('.task-action-btn.delete');
                            if (deleteBtn) {
                                deleteBtn.addEventListener('click', function() {
                                    const taskId = this.getAttribute('data-task-id');
                                    deleteTask(taskId);
                                    modal.classList.remove('active');
                                });
                            }

                            modalDayTasks.appendChild(modalTask);
                        }
                    }
                });

                // Show modal
                modal.classList.add('active');
            }
        }

        // Initialize charts
        function initCharts() {
            // Tasks Chart
            const tasksCtx = document.getElementById('tasksChart');
            if (tasksCtx) {
                new Chart(tasksCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Completadas', 'Pendientes'],
                        datasets: [{
                            label: 'Tareas',
                            data: [24, 12],
                            backgroundColor: [
                                'rgba(76, 175, 80, 0.7)',
                                'rgba(255, 82, 82, 0.7)'
                            ],
                            borderColor: [
                                'rgba(76, 175, 80, 1)',
                                'rgba(255, 82, 82, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Priority Chart
            const priorityCtx = document.getElementById('priorityChart');
            if (priorityCtx) {
                new Chart(priorityCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Alta', 'Media', 'Baja'],
                        datasets: [{
                            data: [5, 8, 3],
                            backgroundColor: [
                                'rgba(255, 82, 82, 0.7)',
                                'rgba(255, 193, 7, 0.7)',
                                'rgba(76, 175, 80, 0.7)'
                            ],
                            borderColor: [
                                'rgba(255, 82, 82, 1)',
                                'rgba(255, 193, 7, 1)',
                                'rgba(76, 175, 80, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true
                    }
                });
            }

            // Daily Tasks Chart
            const dailyTasksCtx = document.getElementById('dailyTasksChart');
            if (dailyTasksCtx) {
                new Chart(dailyTasksCtx, {
                    type: 'line',
                    data: {
                        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                        datasets: [{
                            label: 'Tareas Completadas',
                            data: [5, 7, 3, 8, 6, 4, 2],
                            fill: true,
                            backgroundColor: 'rgba(255, 165, 89, 0.2)',
                            borderColor: 'rgba(255, 165, 89, 1)',
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Monthly Tasks Chart
            const monthlyTasksCtx = document.getElementById('monthlyTasksChart');
            if (monthlyTasksCtx) {
                new Chart(monthlyTasksCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Tareas Completadas',
                            data: [45, 52, 38, 65, 59, 70],
                            backgroundColor: 'rgba(74, 111, 165, 0.7)',
                            borderColor: 'rgba(74, 111, 165, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Category Performance Chart
            const categoryPerformanceCtx = document.getElementById('categoryPerformanceChart');
            if (categoryPerformanceCtx) {
                new Chart(categoryPerformanceCtx, {
                    type: 'radar',
                    data: {
                        labels: ['Trabajo', 'Personal', 'Salud', 'Estudio', 'Otros'],
                        datasets: [{
                            label: 'Tareas Completadas',
                            data: [18, 12, 8, 10, 5],
                            backgroundColor: 'rgba(255, 165, 89, 0.2)',
                            borderColor: 'rgba(255, 165, 89, 1)',
                            pointBackgroundColor: 'rgba(255, 165, 89, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(255, 165, 89, 1)'
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            r: {
                                beginAtZero: true,
                                max: 20
                            }
                        }
                    }
                });
            }

            // Productivity Chart
            const productivityCtx = document.getElementById('productivityChart');
            if (productivityCtx) {
                new Chart(productivityCtx, {
                    type: 'line',
                    data: {
                        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                        datasets: [{
                            label: 'Productividad',
                            data: [65, 70, 80, 85],
                            fill: true,
                            backgroundColor: 'rgba(255, 165, 89, 0.2)',
                            borderColor: 'rgba(255, 165, 89, 1)',
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100
                            }
                        }
                    }
                });
            }
        }

        // Update charts with new data
        function updateCharts() {
            // This function would update the charts with new data when tasks are completed
            // For now, we'll just reinitialize the charts
            if (chartsInitialized) {
                // Destroy existing charts
                Chart.helpers.each(Chart.instances, function(instance) {
                    instance.destroy();
                });

                // Reinitialize charts
                initCharts();
            }
        }

        // Initialize finance charts
        function initFinanceCharts() {
            // Income vs Expense Chart
            const incomeExpenseCtx = document.getElementById('incomeExpenseChart');
            if (incomeExpenseCtx) {
                new Chart(incomeExpenseCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
                        datasets: [
                            {
                                label: 'Ingresos',
                                data: [2500, 2800, 3000, 3200, 3200],
                                backgroundColor: 'rgba(76, 175, 80, 0.7)',
                                borderColor: 'rgba(76, 175, 80, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Gastos',
                                data: [1200, 900, 1100, 800, 750],
                                backgroundColor: 'rgba(255, 82, 82, 0.7)',
                                borderColor: 'rgba(255, 82, 82, 1)',
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Cash Flow Chart
            const cashFlowCtx = document.getElementById('cashFlowChart');
            if (cashFlowCtx) {
                new Chart(cashFlowCtx, {
                    type: 'line',
                    data: {
                        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
                        datasets: [{
                            label: 'Balance',
                            data: [1500, 2200, 1800, 2500, 2450],
                            fill: true,
                            backgroundColor: 'rgba(255, 165, 89, 0.2)',
                            borderColor: 'rgba(255, 165, 89, 1)',
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Expense Distribution Chart
            const expenseDistributionCtx = document.getElementById('expenseDistributionChart');
            if (expenseDistributionCtx) {
                new Chart(expenseDistributionCtx, {
                    type: 'pie',
                    data: {
                        labels: ['Transporte', 'Alimentación', 'Entretenimiento', 'Salud', 'Educación', 'Inversión', 'Otros'],
                        datasets: [{
                            data: [150, 300, 100, 50, 80, 40, 30],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.7)',
                                'rgba(54, 162, 235, 0.7)',
                                'rgba(255, 206, 86, 0.7)',
                                'rgba(75, 192, 192, 0.7)',
                                'rgba(153, 102, 255, 0.7)',
                                'rgba(255, 159, 64, 0.7)',
                                'rgba(199, 199, 199, 0.7)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(199, 199, 199, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true
                    }
                });
            }
        }

        // Initialize notes
        function initNotes() {
            const newNoteBtn = document.getElementById('newNoteBtn');
            const notesGrid = document.getElementById('notesGrid');

            if (newNoteBtn && notesGrid) {
                newNoteBtn.addEventListener('click', function() {
                    const noteModal = document.getElementById('noteModal');
                    if (noteModal) {
                        noteModal.classList.add('active');
                    }
                });
            }

            // Pin functionality for existing notes
            const notePins = document.querySelectorAll('.note-pin');
            notePins.forEach(pin => {
                pin.addEventListener('click', function() {
                    this.classList.toggle('pinned');
                    const note = this.closest('.note');
                    if (note) {
                        note.classList.toggle('pinned');

                        // If pinned, add to dashboard
                        if (this.classList.contains('pinned')) {
                            const dashboardNotes = document.querySelector('#dashboard .notes-grid');
                            if (dashboardNotes) {
                                const clonedNote = note.cloneNode(true);
                                dashboardNotes.appendChild(clonedNote);

                                // Add pin functionality to cloned note
                                const clonedPin = clonedNote.querySelector('.note-pin');
                                if (clonedPin) {
                                    clonedPin.addEventListener('click', function() {
                                        this.classList.toggle('pinned');
                                        clonedNote.classList.toggle('pinned');

                                        // If unpinned, remove from dashboard
                                        if (!this.classList.contains('pinned')) {
                                            clonedNote.remove();
                                        }
                                    });
                                }
                            }
                        }
                    }
                });
            });

            // Note click functionality for editing
            const notes = document.querySelectorAll('.note');
            notes.forEach(note => {
                note.addEventListener('click', function(e) {
                    // Don't open edit modal if clicking on pin
                    if (e.target.classList.contains('note-pin')) return;

                    const noteId = this.getAttribute('data-note-id');
                    if (noteId) {
                        openEditNoteForm(noteId);
                    }
                });
            });
        }

        // Delete note
        function deleteNote(noteId) {
            const noteElement = document.querySelector(`#notesGrid [data-note-id="${noteId}"]`);
            if (noteElement) {
                noteElement.remove();
            }

            const dashboardNoteElement = document.querySelector(`#dashboard .notes-grid [data-note-id="${noteId}"]`);
            if (dashboardNoteElement) {
                dashboardNoteElement.remove();
            }

            showNotification('Nota eliminada correctamente');
        }

        // Open edit note form
        function openEditNoteForm(noteId) {
            const noteElement = document.querySelector(`[data-note-id="${noteId}"]`);
            if (!noteElement) return;

            const editNoteModal = document.getElementById('editNoteModal');
            const titleInput = document.getElementById('editNoteTitle');
            const contentInput = document.getElementById('editNoteContent');
            const categoryInput = document.getElementById('editNoteCategory');
            const pinnedInput = document.getElementById('editNotePinned');

            if (!editNoteModal || !titleInput || !contentInput || !categoryInput || !pinnedInput) return;

            // Get current note values
            const noteTitle = noteElement.querySelector('.note-title').textContent;
            const noteContent = noteElement.querySelector('.note-content').textContent;
            const noteCategoryText = noteElement.querySelector('.note-category').textContent;
            const isPinned = noteElement.classList.contains('pinned');

            // Extract category from text
            let category = 'work';
            if (noteCategoryText === 'Personal') category = 'personal';
            else if (noteCategoryText === 'Salud') category = 'health';
            else if (noteCategoryText === 'Estudio') category = 'study';
            else if (noteCategoryText === 'Otros') category = 'other';

            // Set form values
            if (titleInput) titleInput.value = noteTitle;
            if (contentInput) contentInput.value = noteContent;
            if (categoryInput) categoryInput.value = category;
            if (pinnedInput) pinnedInput.checked = isPinned;

            // Set current editing note ID
            currentEditingNoteId = noteId;

            // Show modal
            editNoteModal.classList.add('active');
        }

        // Initialize notifications
        function initNotifications() {
            const notification = document.getElementById('notification');
            const notificationClose = document.getElementById('notificationClose');

            if (notificationClose) {
                notificationClose.addEventListener('click', function() {
                    notification.classList.remove('show');
                });
            }
        }

        // Show notification
        function showNotification(message) {
            const notification = document.getElementById('notification');
            const notificationText = document.getElementById('notificationText');

            if (notification && notificationText) {
                notificationText.textContent = message;
                notification.classList.add('show');

                // Auto-hide after 3 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }
        }

        // Initialize modals
        function initModals() {
            // Calendar day modal
            const calendarDayModal = document.getElementById('calendarDayModal');
            const modalClose = document.getElementById('modalClose');

            if (calendarDayModal && modalClose) {
                modalClose.addEventListener('click', function() {
                    calendarDayModal.classList.remove('active');
                });

                // Close modal when clicking outside
                calendarDayModal.addEventListener('click', function(e) {
                    if (e.target === calendarDayModal) {
                        calendarDayModal.classList.remove('active');
                    }
                });
            }

            // Transaction modal
            const transactionModal = document.getElementById('transactionModal');
            const transactionModalClose = document.getElementById('transactionModalClose');
            const newTransactionBtn = document.getElementById('newTransactionBtn');
            const cancelTransactionBtn = document.getElementById('cancelTransactionBtn');

            if (transactionModal && transactionModalClose && newTransactionBtn && cancelTransactionBtn) {
                newTransactionBtn.addEventListener('click', function() {
                    transactionModal.classList.add('active');
                });

                transactionModalClose.addEventListener('click', function() {
                    transactionModal.classList.remove('active');
                });

                cancelTransactionBtn.addEventListener('click', function() {
                    transactionModal.classList.remove('active');
                });

                // Close modal when clicking outside
                transactionModal.addEventListener('click', function(e) {
                    if (e.target === transactionModal) {
                        transactionModal.classList.remove('active');
                    }
                });
            }

            // Edit transaction modal
            const editTransactionModal = document.getElementById('editTransactionModal');
            const editTransactionModalClose = document.getElementById('editTransactionModalClose');
            const cancelEditTransactionBtn = document.getElementById('cancelEditTransactionBtn');

            if (editTransactionModal && editTransactionModalClose && cancelEditTransactionBtn) {
                editTransactionModalClose.addEventListener('click', function() {
                    editTransactionModal.classList.remove('active');
                    currentEditingTransactionId = null;
                });

                cancelEditTransactionBtn.addEventListener('click', function() {
                    editTransactionModal.classList.remove('active');
                    currentEditingTransactionId = null;
                });

                // Close modal when clicking outside
                editTransactionModal.addEventListener('click', function(e) {
                    if (e.target === editTransactionModal) {
                        editTransactionModal.classList.remove('active');
                        currentEditingTransactionId = null;
                    }
                });
            }

            // Note modal
            const noteModal = document.getElementById('noteModal');
            const noteModalClose = document.getElementById('noteModalClose');
            const saveNoteBtn = document.getElementById('saveNoteBtn');
            const cancelNoteBtn = document.getElementById('cancelNoteBtn');

            if (noteModal && noteModalClose && saveNoteBtn && cancelNoteBtn) {
                noteModalClose.addEventListener('click', function() {
                    noteModal.classList.remove('active');
                });

                cancelNoteBtn.addEventListener('click', function() {
                    noteModal.classList.remove('active');
                });

                saveNoteBtn.addEventListener('click', function() {
                    const titleInput = document.getElementById('noteTitle');
                    const contentInput = document.getElementById('noteContent');
                    const categoryInput = document.getElementById('noteCategory');
                    const pinnedInput = document.getElementById('notePinned');

                    const title = titleInput ? titleInput.value : '';
                    const content = contentInput ? contentInput.value : '';
                    const category = categoryInput ? categoryInput.value : '';
                    const isPinned = pinnedInput ? pinnedInput.checked : false;

                    if (title && content) {
                        const notesGrid = document.getElementById('notesGrid');
                        if (notesGrid) {
                            // Generate unique ID for the note
                            const noteId = noteIdCounter++;

                            const newNote = document.createElement('div');
                            newNote.className = `note fade-in ${isPinned ? 'pinned' : ''}`;
                            newNote.setAttribute('data-note-id', noteId);
                            newNote.innerHTML = `
                                <div class="note-category">${utils.getCategoryName(category)}</div>
                                <i class="fas fa-thumbtack note-pin ${isPinned ? 'pinned' : ''}"></i>
                                <div class="note-title">${title}</div>
                                <div class="note-content">${content}</div>
                                <div class="note-date">${new Date().toLocaleDateString()}</div>
                            `;

                            notesGrid.prepend(newNote);

                            // Add pin functionality
                            const pinIcon = newNote.querySelector('.note-pin');
                            if (pinIcon) {
                                pinIcon.addEventListener('click', function() {
                                    this.classList.toggle('pinned');
                                    newNote.classList.toggle('pinned');

                                    // If pinned, add to dashboard
                                    if (this.classList.contains('pinned')) {
                                        const dashboardNotes = document.querySelector('#dashboard .notes-grid');
                                        if (dashboardNotes) {
                                            const clonedNote = newNote.cloneNode(true);
                                            dashboardNotes.appendChild(clonedNote);

                                            // Add pin functionality to cloned note
                                            const clonedPin = clonedNote.querySelector('.note-pin');
                                            if (clonedPin) {
                                                clonedPin.addEventListener('click', function() {
                                                    this.classList.toggle('pinned');
                                                    clonedNote.classList.toggle('pinned');

                                                    // If unpinned, remove from dashboard
                                                    if (!this.classList.contains('pinned')) {
                                                        clonedNote.remove();
                                                    }
                                                });
                                            }
                                        }
                                    }
                                });
                            }

                            // Add click functionality for editing
                            newNote.addEventListener('click', function(e) {
                                // Don't open edit modal if clicking on pin
                                if (e.target.classList.contains('note-pin')) return;

                                openEditNoteForm(noteId);
                            });

                            // If pinned, add to dashboard
                            if (isPinned) {
                                const dashboardNotes = document.querySelector('#dashboard .notes-grid');
                                if (dashboardNotes) {
                                    const clonedNote = newNote.cloneNode(true);
                                    dashboardNotes.appendChild(clonedNote);

                                    // Add pin functionality to cloned note
                                    const clonedPin = clonedNote.querySelector('.note-pin');
                                    if (clonedPin) {
                                        clonedPin.addEventListener('click', function() {
                                            this.classList.toggle('pinned');
                                            clonedNote.classList.toggle('pinned');

                                            // If unpinned, remove from dashboard
                                            if (!this.classList.contains('pinned')) {
                                                clonedNote.remove();
                                            }
                                        });
                                    }
                                }
                            }
                        }

                        // Close modal and reset
                        noteModal.classList.remove('active');
                        if (titleInput) titleInput.value = '';
                        if (contentInput) contentInput.value = '';

                        // Show notification
                        showNotification('Nota guardada correctamente');
                    }
                });

                // Close modal when clicking outside
                noteModal.addEventListener('click', function(e) {
                    if (e.target === noteModal) {
                        noteModal.classList.remove('active');
                    }
                });
            }

            // Edit note modal
            const editNoteModal = document.getElementById('editNoteModal');
            const editNoteModalClose = document.getElementById('editNoteModalClose');
            const updateNoteBtn = document.getElementById('updateNoteBtn');
            const cancelEditNoteBtn = document.getElementById('cancelEditNoteBtn');
            const deleteNoteBtn = document.getElementById('deleteNoteBtn');

            if (editNoteModal && editNoteModalClose && updateNoteBtn && cancelEditNoteBtn && deleteNoteBtn) {
                editNoteModalClose.addEventListener('click', function() {
                    editNoteModal.classList.remove('active');
                    currentEditingNoteId = null;
                });

                cancelEditNoteBtn.addEventListener('click', function() {
                    editNoteModal.classList.remove('active');
                    currentEditingNoteId = null;
                });

                deleteNoteBtn.addEventListener('click', function() {
                    if (currentEditingNoteId) {
                        deleteNote(currentEditingNoteId);
                        editNoteModal.classList.remove('active');
                        currentEditingNoteId = null;
                    }
                });

                updateNoteBtn.addEventListener('click', function() {
                    const titleInput = document.getElementById('editNoteTitle');
                    const contentInput = document.getElementById('editNoteContent');
                    const categoryInput = document.getElementById('editNoteCategory');
                    const pinnedInput = document.getElementById('editNotePinned');

                    const title = titleInput ? titleInput.value : '';
                    const content = contentInput ? contentInput.value : '';
                    const category = categoryInput ? categoryInput.value : '';
                    const isPinned = pinnedInput ? pinnedInput.checked : false;

                    if (title && content && currentEditingNoteId) {
                        // Find the note element
                        const noteElement = document.querySelector(`[data-note-id="${currentEditingNoteId}"]`);
                        if (noteElement) {
                            // Update note content
                            const noteTitle = noteElement.querySelector('.note-title');
                            const noteContent = noteElement.querySelector('.note-content');
                            const noteCategory = noteElement.querySelector('.note-category');
                            const notePin = noteElement.querySelector('.note-pin');

                            if (noteTitle) noteTitle.textContent = title;
                            if (noteContent) noteContent.textContent = content;
                            if (noteCategory) noteCategory.textContent = utils.getCategoryName(category);

                            // Update pinned status
                            if (isPinned) {
                                noteElement.classList.add('pinned');
                                if (notePin) notePin.classList.add('pinned');

                                // Add to dashboard if not already there
                                const dashboardNote = document.querySelector(`#dashboard .notes-grid [data-note-id="${currentEditingNoteId}"]`);
                                if (!dashboardNote) {
                                    const dashboardNotes = document.querySelector('#dashboard .notes-grid');
                                    if (dashboardNotes) {
                                        const clonedNote = noteElement.cloneNode(true);
                                        dashboardNotes.appendChild(clonedNote);

                                        // Add pin functionality to cloned note
                                        const clonedPin = clonedNote.querySelector('.note-pin');
                                        if (clonedPin) {
                                            clonedPin.addEventListener('click', function() {
                                                this.classList.toggle('pinned');
                                                clonedNote.classList.toggle('pinned');

                                                // If unpinned, remove from dashboard
                                                if (!this.classList.contains('pinned')) {
                                                    clonedNote.remove();
                                                }
                                            });
                                        }
                                    }
                                }
                            } else {
                                noteElement.classList.remove('pinned');
                                if (notePin) notePin.classList.remove('pinned');

                                // Remove from dashboard if it was there
                                const dashboardNote = document.querySelector(`#dashboard .notes-grid [data-note-id="${currentEditingNoteId}"]`);
                                if (dashboardNote) {
                                    dashboardNote.remove();
                                }
                            }
                        }

                        // Close modal and reset
                        editNoteModal.classList.remove('active');
                        currentEditingNoteId = null;

                        // Show notification
                        showNotification('Nota actualizada correctamente');
                    }
                });

                // Close modal when clicking outside
                editNoteModal.addEventListener('click', function(e) {
                    if (e.target === editNoteModal) {
                        editNoteModal.classList.remove('active');
                        currentEditingNoteId = null;
                    }
                });
            }

            // Category modal
            const categoryModal = document.getElementById('categoryModal');
            const categoryModalClose = document.getElementById('categoryModalClose');
            const addCategoryBtn = document.getElementById('addCategoryBtn');
            const saveCategoryBtn = document.getElementById('saveCategoryBtn');
            const cancelCategoryBtn = document.getElementById('cancelCategoryBtn');

            if (categoryModal && categoryModalClose && addCategoryBtn && saveCategoryBtn && cancelCategoryBtn) {
                addCategoryBtn.addEventListener('click', function() {
                    categoryModal.classList.add('active');
                });

                categoryModalClose.addEventListener('click', function() {
                    categoryModal.classList.remove('active');
                });

                cancelCategoryBtn.addEventListener('click', function() {
                    categoryModal.classList.remove('active');
                });

                saveCategoryBtn.addEventListener('click', function() {
                    const nameInput = document.getElementById('categoryName');
                    const name = nameInput ? nameInput.value : '';

                    if (name) {
                        // Add new category to the list
                        const categoryList = document.querySelector('.category-list');
                        if (categoryList) {
                            const newCategory = document.createElement('div');
                            newCategory.className = 'category-item';
                            newCategory.innerHTML = `
                                <div class="category-color" style="background-color: ${selectedCategoryColor};"></div>
                                <div class="category-name">${name}</div>
                                <i class="fas fa-times category-delete"></i>
                            `;

                            categoryList.appendChild(newCategory);

                            // Add delete functionality
                            const deleteBtn = newCategory.querySelector('.category-delete');
                            if (deleteBtn) {
                                deleteBtn.addEventListener('click', function() {
                                    newCategory.remove();
                                });
                            }
                        }

                        // Close modal and reset
                        categoryModal.classList.remove('active');
                        if (nameInput) nameInput.value = '';

                        // Show notification
                        showNotification('Categoría agregada correctamente');
                    }
                });

                // Color options
                const colorOptions = document.querySelectorAll('#categoryModal .color-option');
                colorOptions.forEach(option => {
                    option.addEventListener('click', function() {
                        // Remove active class from all options
                        colorOptions.forEach(opt => opt.classList.remove('active'));

                        // Add active class to clicked option
                        this.classList.add('active');

                        // Update selected color
                        selectedCategoryColor = this.getAttribute('data-color');
                    });
                });

                // Close modal when clicking outside
                categoryModal.addEventListener('click', function(e) {
                    if (e.target === categoryModal) {
                        categoryModal.classList.remove('active');
                    }
                });
            }
        }

        // Initialize projects
        function initProjects() {
            const newProjectBtn = document.getElementById('newProjectBtn');

            if (newProjectBtn) {
                newProjectBtn.addEventListener('click', function() {
                    showNotification('Función de crear proyecto próximamente');
                });
            }

            // Initialize project task checkboxes
            const projectTaskCheckboxes = document.querySelectorAll('.project-task-checkbox');
            projectTaskCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('click', function() {
                    this.classList.toggle('checked');

                    // Update project progress
                    const projectCard = this.closest('.project-card');
                    if (projectCard) {
                        updateProjectProgress(projectCard);
                    }
                });
            });
        }

        // Update project progress
        function updateProjectProgress(projectCard) {
            const taskCheckboxes = projectCard.querySelectorAll('.project-task-checkbox');
            const totalTasks = taskCheckboxes.length;
            const completedTasks = projectCard.querySelectorAll('.project-task-checkbox.checked').length;

            const progressPercent = Math.round((completedTasks / totalTasks) * 100);

            const progressFill = projectCard.querySelector('.progress-fill');
            const progressText = projectCard.querySelector('.progress-text span:first-child');

            if (progressFill) {
                progressFill.style.width = `${progressPercent}%`;
            }

            if (progressText) {
                progressText.textContent = `${progressPercent}% Completado`;
            }
        }

        // Initialize finance
        function initFinance() {
            const saveTransactionBtn = document.getElementById('saveTransactionBtn');
            const transactionCards = document.getElementById('transactionCards');

            if (saveTransactionBtn && transactionCards) {
                saveTransactionBtn.addEventListener('click', function() {
                    const transactionType = document.getElementById('transactionType');
                    const transactionDescription = document.getElementById('transactionDescription');
                    const transactionCategory = document.getElementById('transactionCategory');
                    const transactionAmount = document.getElementById('transactionAmount');
                    const transactionDate = document.getElementById('transactionDate');

                    const type = transactionType ? transactionType.value : '';
                    const description = transactionDescription ? transactionDescription.value : '';
                    const category = transactionCategory ? transactionCategory.value : '';
                    const amount = transactionAmount ? parseFloat(transactionAmount.value) : 0;
                    const date = transactionDate ? transactionDate.value : new Date().toISOString().split('T')[0];

                    if (description && amount > 0 && transactionCards) {
                        // Create new transaction card
                        const newCard = document.createElement('div');
                        newCard.className = `transaction-card ${type}`;
                        newCard.setAttribute('data-transaction-id', transactionIdCounter++);

                        const formattedAmount = type === 'income' ? `+$${amount.toFixed(2)}` : `-$${amount.toFixed(2)}`;
                        const categoryName = utils.getTransactionCategoryName(category);

                        newCard.innerHTML = `
                            <div class="transaction-header">
                                <div class="transaction-title">${description}</div>
                                <div class="transaction-amount ${type}">${formattedAmount}</div>
                            </div>
                            <div class="transaction-details">
                                <div>${categoryName}</div>
                                <div>${utils.formatDate(date)}</div>
                            </div>
                            <div class="transaction-actions">
                                <button class="transaction-action-btn edit" data-transaction-id="${newCard.getAttribute('data-transaction-id')}">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="transaction-action-btn delete" data-transaction-id="${newCard.getAttribute('data-transaction-id')}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `;

                        // Add to transaction cards
                        transactionCards.prepend(newCard);

                        // Add edit functionality
                        const editBtn = newCard.querySelector('.transaction-action-btn.edit');
                        if (editBtn) {
                            editBtn.addEventListener('click', function() {
                                const transactionId = this.getAttribute('data-transaction-id');
                                openEditTransactionForm(transactionId);
                            });
                        }

                        // Add delete functionality
                        const deleteBtn = newCard.querySelector('.transaction-action-btn.delete');
                        if (deleteBtn) {
                            deleteBtn.addEventListener('click', function() {
                                const transactionId = this.getAttribute('data-transaction-id');
                                deleteTransaction(transactionId);
                            });
                        }

                        // Close modal
                        const transactionModal = document.getElementById('transactionModal');
                        if (transactionModal) {
                            transactionModal.classList.remove('active');
                        }

                        // Clear form
                        if (transactionDescription) transactionDescription.value = '';
                        if (transactionAmount) transactionAmount.value = '';
                        if (transactionDate) transactionDate.value = '';

                        // Show notification
                        showNotification('Transacción agregada correctamente');

                        // Update finance summary
                        updateFinanceSummary(type, amount);

                        // Update charts if initialized
                        if (financeChartsInitialized) {
                            updateFinanceCharts();
                        }
                    }
                });
            }

            // Update transaction form functionality
            const updateTransactionBtn = document.getElementById('updateTransactionBtn');

            if (updateTransactionBtn) {
                updateTransactionBtn.addEventListener('click', function() {
                    const transactionType = document.getElementById('editTransactionType');
                    const transactionDescription = document.getElementById('editTransactionDescription');
                    const transactionCategory = document.getElementById('editTransactionCategory');
                    const transactionAmount = document.getElementById('editTransactionAmount');
                    const transactionDate = document.getElementById('editTransactionDate');

                    const type = transactionType ? transactionType.value : '';
                    const description = transactionDescription ? transactionDescription.value : '';
                    const category = transactionCategory ? transactionCategory.value : '';
                    const amount = transactionAmount ? parseFloat(transactionAmount.value) : 0;
                    const date = transactionDate ? transactionDate.value : new Date().toISOString().split('T')[0];

                    if (description && amount > 0 && currentEditingTransactionId) {
                        // Find the transaction element
                        const transactionElement = document.querySelector(`[data-transaction-id="${currentEditingTransactionId}"]`);
                        if (transactionElement) {
                            // Get old values for summary update
                            const oldType = transactionElement.classList.contains('income') ? 'income' : 'expense';
                            const oldAmountText = transactionElement.querySelector('.transaction-amount').textContent;
                            const oldAmount = parseFloat(oldAmountText.replace(/[^0-9.-]/g, ''));

                            // Update transaction properties
                            transactionElement.className = `transaction-card ${type}`;

                            // Update transaction content
                            const transactionTitle = transactionElement.querySelector('.transaction-title');
                            const transactionAmountElement = transactionElement.querySelector('.transaction-amount');
                            const transactionDetails = transactionElement.querySelectorAll('.transaction-details div');

                            if (transactionTitle) transactionTitle.textContent = description;
                            if (transactionAmountElement) {
                                const formattedAmount = type === 'income' ? `+$${amount.toFixed(2)}` : `-$${amount.toFixed(2)}`;
                                transactionAmountElement.textContent = formattedAmount;
                                transactionAmountElement.className = `transaction-amount ${type}`;
                            }

                            if (transactionDetails[0]) transactionDetails[0].textContent = utils.getTransactionCategoryName(category);
                            if (transactionDetails[1]) transactionDetails[1].textContent = utils.formatDate(date);

                            // Update finance summary
                            // First, reverse the old transaction
                            const reversedType = oldType === 'income' ? 'expense' : 'income';
                            updateFinanceSummary(reversedType, oldAmount);

                            // Then, apply the new transaction
                            updateFinanceSummary(type, amount);

                            // Update charts if initialized
                            if (financeChartsInitialized) {
                                updateFinanceCharts();
                            }
                        }

                        // Close modal and reset
                        const editTransactionModal = document.getElementById('editTransactionModal');
                        if (editTransactionModal) {
                            editTransactionModal.classList.remove('active');
                        }
                        currentEditingTransactionId = null;

                        // Show notification
                        showNotification('Transacción actualizada correctamente');
                    }
                });
            }

            // Initialize transaction action buttons
            const transactionEditBtns = document.querySelectorAll('.transaction-action-btn.edit');
            const transactionDeleteBtns = document.querySelectorAll('.transaction-action-btn.delete');

            transactionEditBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const transactionId = this.getAttribute('data-transaction-id');
                    openEditTransactionForm(transactionId);
                });
            });

            transactionDeleteBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const transactionId = this.getAttribute('data-transaction-id');
                    deleteTransaction(transactionId);
                });
            });

            // Export finance to Excel
            const exportFinanceExcelBtn = document.getElementById('exportFinanceExcelBtn');
            if (exportFinanceExcelBtn) {
                exportFinanceExcelBtn.addEventListener('click', function() {
                    exportFinanceToExcel();
                });
            }
        }

        // Open edit transaction form
        function openEditTransactionForm(transactionId) {
            const transactionElement = document.querySelector(`[data-transaction-id="${transactionId}"]`);
            if (!transactionElement) return;

            const editTransactionModal = document.getElementById('editTransactionModal');
            const typeInput = document.getElementById('editTransactionType');
            const descriptionInput = document.getElementById('editTransactionDescription');
            const categoryInput = document.getElementById('editTransactionCategory');
            const amountInput = document.getElementById('editTransactionAmount');
            const dateInput = document.getElementById('editTransactionDate');

            if (!editTransactionModal || !typeInput || !descriptionInput || !categoryInput || !amountInput || !dateInput) return;

            // Get current transaction values
            const transactionTitle = transactionElement.querySelector('.transaction-title').textContent;
            const transactionAmountText = transactionElement.querySelector('.transaction-amount').textContent;
            const transactionCategoryText = transactionElement.querySelectorAll('.transaction-details div')[0].textContent;
            const transactionDateText = transactionElement.querySelectorAll('.transaction-details div')[1].textContent;

            // Extract type and amount from text
            const isIncome = transactionElement.classList.contains('income');
            const type = isIncome ? 'income' : 'expense';
            const amount = parseFloat(transactionAmountText.replace(/[^0-9.-]/g, ''));

            // Extract category from text
            let category = 'food';
            if (transactionCategoryText === 'Transporte') category = 'transport';
            else if (transactionCategoryText === 'Entretenimiento') category = 'entertainment';
            else if (transactionCategoryText === 'Salud') category = 'health';
            else if (transactionCategoryText === 'Educación') category = 'education';
            else if (transactionCategoryText === 'Inversión') category = 'investment';
            else if (transactionCategoryText === 'Otros') category = 'other';

            // Parse date
            const date = utils.parseDate(transactionDateText);

            // Set form values
            if (typeInput) typeInput.value = type;
            if (descriptionInput) descriptionInput.value = transactionTitle;
            if (categoryInput) categoryInput.value = category;
            if (amountInput) amountInput.value = amount;
            if (dateInput) dateInput.value = date;

            // Set current editing transaction ID
            currentEditingTransactionId = transactionId;

            // Show modal
            editTransactionModal.classList.add('active');
        }

        // Delete transaction
        function deleteTransaction(transactionId) {
            const transactionElement = document.querySelector(`[data-transaction-id="${transactionId}"]`);
            if (!transactionElement) return;

            // Get transaction values for summary update
            const isIncome = transactionElement.classList.contains('income');
            const type = isIncome ? 'income' : 'expense';
            const amountText = transactionElement.querySelector('.transaction-amount').textContent;
            const amount = parseFloat(amountText.replace(/[^0-9.-]/g, ''));

            // Remove transaction
            transactionElement.style.opacity = '0';
            setTimeout(() => {
                transactionElement.remove();
            }, 300);

            // Update finance summary (reverse the transaction)
            const reversedType = type === 'income' ? 'expense' : 'income';
            updateFinanceSummary(reversedType, amount);

            // Update charts if initialized
            if (financeChartsInitialized) {
                updateFinanceCharts();
            }

            // Show notification
            showNotification('Transacción eliminada correctamente');
        }

        // Update finance summary
        function updateFinanceSummary(type, amount) {
            const incomeElement = document.getElementById('totalIncome');
            const expenseElement = document.getElementById('totalExpense');
            const balanceElement = document.getElementById('totalBalance');
            const dashboardBalanceElement = document.getElementById('dashboardBalance');

            if (incomeElement && expenseElement && balanceElement) {
                const currentIncome = parseFloat(incomeElement.textContent.replace('$', '').replace(',', ''));
                const currentExpense = parseFloat(expenseElement.textContent.replace('$', '').replace(',', ''));

                let newIncome = currentIncome;
                let newExpense = currentExpense;

                if (type === 'income') {
                    newIncome += amount;
                } else {
                    newExpense += amount;
                }

                const newBalance = newIncome - newExpense;

                incomeElement.textContent = `$${newIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
                expenseElement.textContent = `$${newExpense.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
                balanceElement.textContent = `$${newBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

                // Update dashboard balance
                if (dashboardBalanceElement) {
                    dashboardBalanceElement.textContent = `$${newBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
                }

                // Update color based on balance
                if (newBalance < 0) {
                    balanceElement.style.color = 'var(--danger)';
                    if (dashboardBalanceElement) {
                        dashboardBalanceElement.style.color = 'var(--danger)';
                    }
                } else {
                    balanceElement.style.color = 'var(--success)';
                    if (dashboardBalanceElement) {
                        dashboardBalanceElement.style.color = 'var(--success)';
                    }
                }
            }
        }

        // Update finance charts
        function updateFinanceCharts() {
            // This function would update the finance charts with new data
            // For now, we'll just reinitialize the charts
            if (financeChartsInitialized) {
                // Destroy existing charts
                Chart.helpers.each(Chart.instances, function(instance) {
                    if (instance.canvas.id === 'incomeExpenseChart' ||
                        instance.canvas.id === 'cashFlowChart' ||
                        instance.canvas.id === 'expenseDistributionChart') {
                        instance.destroy();
                    }
                });

                // Reinitialize finance charts
                initFinanceCharts();
            }
        }

        // Export finance to Excel
        function exportFinanceToExcel() {
            const transactions = [];

            // Get all transaction data
            const transactionCards = document.querySelectorAll('.transaction-card');
            transactionCards.forEach(card => {
                const title = card.querySelector('.transaction-title').textContent;
                const amountText = card.querySelector('.transaction-amount').textContent;
                const category = card.querySelectorAll('.transaction-details div')[0].textContent;
                const date = card.querySelectorAll('.transaction-details div')[1].textContent;
                const isIncome = card.classList.contains('income');

                transactions.push({
                    Título: title,
                    Monto: amountText,
                    Categoría: category,
                    Fecha: date,
                    Tipo: isIncome ? 'Ingreso' : 'Egreso'
                });
            });

            // Create workbook
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(transactions);

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Transacciones');

            // Save workbook
            XLSX.writeFile(wb, 'transacciones.xlsx');

            // Show notification
            showNotification('Datos exportados a Excel correctamente');
        }

        // Initialize user management
        function initUserManagement() {
            const inviteUserBtn = document.getElementById('inviteUserBtn');
            const sendInviteBtn = document.getElementById('sendInviteBtn');
            const inviteUserCode = document.getElementById('inviteUserCode');

            if (inviteUserBtn) {
                inviteUserBtn.addEventListener('click', function() {
                    showNotification('Función de invitar usuario próximamente');
                });
            }

            if (sendInviteBtn && inviteUserCode) {
                sendInviteBtn.addEventListener('click', function() {
                    const code = inviteUserCode.value;
                    if (code) {
                        // For demo purposes, we'll just show a notification
                        showNotification(`Invitación enviada al usuario con código: ${code}`);
                        inviteUserCode.value = '';
                    } else {
                        showNotification('Por favor, ingresa un código de usuario');
                    }
                });
            }

            // User card buttons
            const userCardBtns = document.querySelectorAll('.user-card-btn');
            userCardBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    if (this.classList.contains('danger')) {
                        showNotification('Función de eliminar usuario próximamente');
                    } else {
                        showNotification('Función de editar usuario próximamente');
                    }
                });
            });
        }

        // Initialize reports
        function initReports() {
            const generateReportBtn = document.getElementById('generateReportBtn');

            if (generateReportBtn) {
                generateReportBtn.addEventListener('click', function() {
                    showNotification('Función de generar reporte próximamente');
                });
            }

            // Weekly tasks PDF
            const weeklyTasksPdfBtn = document.getElementById('weeklyTasksPdfBtn');
            if (weeklyTasksPdfBtn) {
                weeklyTasksPdfBtn.addEventListener('click', function() {
                    generateWeeklyTasksPDF();
                });
            }

            // Weekly tasks Excel
            const weeklyTasksExcelBtn = document.getElementById('weeklyTasksExcelBtn');
            if (weeklyTasksExcelBtn) {
                weeklyTasksExcelBtn.addEventListener('click', function() {
                    generateWeeklyTasksExcel();
                });
            }

            // Monthly finance PDF
            const monthlyFinancePdfBtn = document.getElementById('monthlyFinancePdfBtn');
            if (monthlyFinancePdfBtn) {
                monthlyFinancePdfBtn.addEventListener('click', function() {
                    generateMonthlyFinancePDF();
                });
            }

            // Monthly finance Excel
            const monthlyFinanceExcelBtn = document.getElementById('monthlyFinanceExcelBtn');
            if (monthlyFinanceExcelBtn) {
                monthlyFinanceExcelBtn.addEventListener('click', function() {
                    generateMonthlyFinanceExcel();
                });
            }

            // Productivity PDF
            const productivityPdfBtn = document.getElementById('productivityPdfBtn');
            if (productivityPdfBtn) {
                productivityPdfBtn.addEventListener('click', function() {
                    generateProductivityPDF();
                });
            }

            // Productivity Excel
            const productivityExcelBtn = document.getElementById('productivityExcelBtn');
            if (productivityExcelBtn) {
                productivityExcelBtn.addEventListener('click', function() {
                    generateProductivityExcel();
                });
            }

            // Projects PDF
            const projectsPdfBtn = document.getElementById('projectsPdfBtn');
            if (projectsPdfBtn) {
                projectsPdfBtn.addEventListener('click', function() {
                    generateProjectsPDF();
                });
            }

            // Projects Excel
            const projectsExcelBtn = document.getElementById('projectsExcelBtn');
            if (projectsExcelBtn) {
                projectsExcelBtn.addEventListener('click', function() {
                    generateProjectsExcel();
                });
            }
        }

        // Generate weekly tasks PDF
        function generateWeeklyTasksPDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Add title
            doc.setFontSize(18);
            doc.text('Reporte Semanal de Tareas', 14, 22);

            // Add date
            doc.setFontSize(12);
            const today = new Date();
            const formattedDate = today.toLocaleDateString('es-ES');
            doc.text(`Fecha: ${formattedDate}`, 14, 32);

            // Add tasks table
            const tasks = [];

            // Get all tasks
            const allTasks = document.querySelectorAll('#taskList .task-item');
            allTasks.forEach(task => {
                const title = task.querySelector('.task-title').textContent;
                const description = task.querySelector('.task-description').textContent;
                const priority = task.querySelector('.task-priority').textContent;
                const category = task.querySelector('.task-category').textContent;
                const dates = task.querySelector('.task-dates').textContent;

                tasks.push([
                    title,
                    description,
                    priority,
                    category,
                    dates
                ]);
            });

            // Add table to PDF
            doc.autoTable({
                head: [['Título', 'Descripción', 'Prioridad', 'Categoría', 'Fechas']],
                body: tasks,
                startY: 40
            });

            // Save PDF
            doc.save('reporte_semanal_tareas.pdf');

            // Show notification
            showNotification('Reporte PDF generado correctamente');
        }

        // Generate weekly tasks Excel
        function generateWeeklyTasksExcel() {
            const tasks = [];

            // Get all tasks
            const allTasks = document.querySelectorAll('#taskList .task-item');
            allTasks.forEach(task => {
                const title = task.querySelector('.task-title').textContent;
                const description = task.querySelector('.task-description').textContent;
                const priority = task.querySelector('.task-priority').textContent;
                const category = task.querySelector('.task-category').textContent;
                const dates = task.querySelector('.task-dates').textContent;

                tasks.push({
                    Título: title,
                    Descripción: description,
                    Prioridad: priority,
                    Categoría: category,
                    Fechas: dates
                });
            });

            // Create workbook
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(tasks);

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Tareas Semanales');

            // Save workbook
            XLSX.writeFile(wb, 'reporte_semanal_tareas.xlsx');

            // Show notification
            showNotification('Reporte Excel generado correctamente');
        }

        // Generate monthly finance PDF
        function generateMonthlyFinancePDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Add title
            doc.setFontSize(18);
            doc.text('Reporte Mensual de Finanzas', 14, 22);

            // Add date
            doc.setFontSize(12);
            const today = new Date();
            const formattedDate = today.toLocaleDateString('es-ES');
            doc.text(`Fecha: ${formattedDate}`, 14, 32);

            // Add summary
            const incomeElement = document.getElementById('totalIncome');
            const expenseElement = document.getElementById('totalExpense');
            const balanceElement = document.getElementById('totalBalance');

            if (incomeElement && expenseElement && balanceElement) {
                const income = incomeElement.textContent;
                const expense = expenseElement.textContent;
                const balance = balanceElement.textContent;

                doc.setFontSize(14);
                doc.text('Resumen Financiero', 14, 45);

                doc.setFontSize(12);
                doc.text(`Ingresos: ${income}`, 14, 55);
                doc.text(`Gastos: ${expense}`, 14, 62);
                doc.text(`Balance: ${balance}`, 14, 69);
            }

            // Add transactions table
            const transactions = [];

            // Get all transactions
            const allTransactions = document.querySelectorAll('.transaction-card');
            allTransactions.forEach(transaction => {
                const title = transaction.querySelector('.transaction-title').textContent;
                const amount = transaction.querySelector('.transaction-amount').textContent;
                const category = transaction.querySelectorAll('.transaction-details div')[0].textContent;
                const date = transaction.querySelectorAll('.transaction-details div')[1].textContent;

                transactions.push([
                    title,
                    amount,
                    category,
                    date
                ]);
            });

            // Add table to PDF
            doc.autoTable({
                head: [['Descripción', 'Monto', 'Categoría', 'Fecha']],
                body: transactions,
                startY: 80
            });

            // Save PDF
            doc.save('reporte_mensual_finanzas.pdf');

            // Show notification
            showNotification('Reporte PDF generado correctamente');
        }

        // Generate monthly finance Excel
        function generateMonthlyFinanceExcel() {
            const transactions = [];

            // Get all transactions
            const allTransactions = document.querySelectorAll('.transaction-card');
            allTransactions.forEach(transaction => {
                const title = transaction.querySelector('.transaction-title').textContent;
                const amount = transaction.querySelector('.transaction-amount').textContent;
                const category = transaction.querySelectorAll('.transaction-details div')[0].textContent;
                const date = transaction.querySelectorAll('.transaction-details div')[1].textContent;

                transactions.push({
                    Descripción: title,
                    Monto: amount,
                    Categoría: category,
                    Fecha: date
                });
            });

            // Create workbook
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(transactions);

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Transacciones Mensuales');

            // Save workbook
            XLSX.writeFile(wb, 'reporte_mensual_finanzas.xlsx');

            // Show notification
            showNotification('Reporte Excel generado correctamente');
        }

        // Generate productivity PDF
        function generateProductivityPDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Add title
            doc.setFontSize(18);
            doc.text('Reporte de Productividad', 14, 22);

            // Add date
            doc.setFontSize(12);
            const today = new Date();
            const formattedDate = today.toLocaleDateString('es-ES');
            doc.text(`Fecha: ${formattedDate}`, 14, 32);

            // Add productivity summary
            doc.setFontSize(14);
            doc.text('Resumen de Productividad', 14, 45);

            doc.setFontSize(12);
            doc.text('Tareas completadas esta semana: 24', 14, 55);
            doc.text('Tareas pendientes: 12', 14, 62);
            doc.text('Productividad: 67%', 14, 69);

            // Add tasks by category
            const categories = {
                'Trabajo': 18,
                'Personal': 12,
                'Salud': 8,
                'Estudio': 10,
                'Otros': 5
            };

            doc.setFontSize(14);
            doc.text('Tareas por Categoría', 14, 85);

            doc.setFontSize(12);
            let yPos = 95;
            for (const [category, count] of Object.entries(categories)) {
                doc.text(`${category}: ${count} tareas`, 14, yPos);
                yPos += 7;
            }

            // Save PDF
            doc.save('reporte_productividad.pdf');

            // Show notification
            showNotification('Reporte PDF generado correctamente');
        }

        // Generate productivity Excel
        function generateProductivityExcel() {
            const data = [];

            // Add summary data
            data.push({
                Métrica: 'Tareas completadas esta semana',
                Valor: 24
            });

            data.push({
                Métrica: 'Tareas pendientes',
                Valor: 12
            });

            data.push({
                Métrica: 'Productividad',
                Valor: '67%'
            });

            // Add category data
            const categories = {
                'Trabajo': 18,
                'Personal': 12,
                'Salud': 8,
                'Estudio': 10,
                'Otros': 5
            };

            for (const [category, count] of Object.entries(categories)) {
                data.push({
                    Métrica: `Tareas de ${category}`,
                    Valor: count
                });
            }

            // Create workbook
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(data);

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Productividad');

            // Save workbook
            XLSX.writeFile(wb, 'reporte_productividad.xlsx');

            // Show notification
            showNotification('Reporte Excel generado correctamente');
        }

        // Generate projects PDF
        function generateProjectsPDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Add title
            doc.setFontSize(18);
            doc.text('Reporte de Proyectos', 14, 22);

            // Add date
            doc.setFontSize(12);
            const today = new Date();
            const formattedDate = today.toLocaleDateString('es-ES');
            doc.text(`Fecha: ${formattedDate}`, 14, 32);

            // Add projects data
            const projects = [];

            // Get all projects
            const allProjects = document.querySelectorAll('.project-card');
            allProjects.forEach(project => {
                const title = project.querySelector('.project-title').textContent;
                const status = project.querySelector('.project-status').textContent;
                const progressText = project.querySelector('.progress-text span:first-child').textContent;

                projects.push([
                    title,
                    status,
                    progressText
                ]);
            });

            // Add table to PDF
            doc.autoTable({
                head: [['Proyecto', 'Estado', 'Progreso']],
                body: projects,
                startY: 40
            });

            // Save PDF
            doc.save('reporte_proyectos.pdf');

            // Show notification
            showNotification('Reporte PDF generado correctamente');
        }

        // Generate projects Excel
        function generateProjectsExcel() {
            const projects = [];

            // Get all projects
            const allProjects = document.querySelectorAll('.project-card');
            allProjects.forEach(project => {
                const title = project.querySelector('.project-title').textContent;
                const status = project.querySelector('.project-status').textContent;
                const progressText = project.querySelector('.progress-text span:first-child').textContent;

                projects.push({
                    Proyecto: title,
                    Estado: status,
                    Progreso: progressText
                });
            });

            // Create workbook
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(projects);

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Proyectos');

            // Save workbook
            XLSX.writeFile(wb, 'reporte_proyectos.xlsx');

            // Show notification
            showNotification('Reporte Excel generado correctamente');
        }

        // Initialize settings
        function initSettings() {
            // Theme options
            const colorOptions = document.querySelectorAll('.color-option');
            colorOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const theme = this.getAttribute('data-theme');
                    applyTheme(theme);

                    // Save theme preference
                    localStorage.setItem('theme', theme);
                });
            });

            // Load saved theme
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                applyTheme(savedTheme);
            }

            // Export tasks to Excel
            const exportTasksExcelBtn = document.getElementById('exportTasksExcelBtn');
            if (exportTasksExcelBtn) {
                exportTasksExcelBtn.addEventListener('click', function() {
                    exportTasksToExcel();
                });
            }

            // Export tasks to PDF
            const exportTasksPdfBtn = document.getElementById('exportTasksPdfBtn');
            if (exportTasksPdfBtn) {
                exportTasksPdfBtn.addEventListener('click', function() {
                    exportTasksToPDF();
                });
            }

            // Export finance to PDF
            const exportFinancePdfBtn = document.getElementById('exportFinancePdfBtn');
            if (exportFinancePdfBtn) {
                exportFinancePdfBtn.addEventListener('click', function() {
                    generateMonthlyFinancePDF();
                });
            }

            // Category delete buttons
            const categoryDeleteBtns = document.querySelectorAll('.category-delete');
            categoryDeleteBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const categoryItem = this.closest('.category-item');
                    if (categoryItem) {
                        categoryItem.remove();
                        showNotification('Categoría eliminada correctamente');
                    }
                });
            });
        }

        // Apply theme
        function applyTheme(theme) {
            document.body.className = '';

            if (theme === 'blue') {
                document.body.classList.add('theme-blue');
            } else if (theme === 'green') {
                document.body.classList.add('theme-green');
            } else if (theme === 'purple') {
                document.body.classList.add('theme-purple');
            } else if (theme === 'red') {
                document.body.classList.add('theme-red');
            }
        }

        // Export tasks to Excel
        function exportTasksToExcel() {
            const tasks = [];

            // Get all tasks
            const allTasks = document.querySelectorAll('#taskList .task-item');
            allTasks.forEach(task => {
                const title = task.querySelector('.task-title').textContent;
                const description = task.querySelector('.task-description').textContent;
                const priority = task.querySelector('.task-priority').textContent;
                const category = task.querySelector('.task-category').textContent;
                const dates = task.querySelector('.task-dates').textContent;

                tasks.push({
                    Título: title,
                    Descripción: description,
                    Prioridad: priority,
                    Categoría: category,
                    Fechas: dates
                });
            });

            // Create workbook
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(tasks);

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Tareas');

            // Save workbook
            XLSX.writeFile(wb, 'tareas.xlsx');

            // Show notification
            showNotification('Tareas exportadas a Excel correctamente');
        }

        // Export tasks to PDF
        function exportTasksToPDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Add title
            doc.setFontSize(18);
            doc.text('Reporte de Tareas', 14, 22);

            // Add date
            doc.setFontSize(12);
            const today = new Date();
            const formattedDate = today.toLocaleDateString('es-ES');
            doc.text(`Fecha: ${formattedDate}`, 14, 32);

            // Add tasks table
            const tasks = [];

            // Get all tasks
            const allTasks = document.querySelectorAll('#taskList .task-item');
            allTasks.forEach(task => {
                const title = task.querySelector('.task-title').textContent;
                const description = task.querySelector('.task-description').textContent;
                const priority = task.querySelector('.task-priority').textContent;
                const category = task.querySelector('.task-category').textContent;
                const dates = task.querySelector('.task-dates').textContent;

                tasks.push([
                    title,
                    description,
                    priority,
                    category,
                    dates
                ]);
            });

            // Add table to PDF
            doc.autoTable({
                head: [['Título', 'Descripción', 'Prioridad', 'Categoría', 'Fechas']],
                body: tasks,
                startY: 40
            });

            // Save PDF
            doc.save('tareas.pdf');

            // Show notification
            showNotification('Tareas exportadas a PDF correctamente');
        }

        // Initialize search functionality
        function initSearch() {
            const searchInputs = document.querySelectorAll('.search-input');

            searchInputs.forEach(input => {
                input.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();

                    if (searchTerm.length > 2) {
                        // Search in tasks
                        const allTasks = document.querySelectorAll('.task-item');
                        allTasks.forEach(task => {
                            const titleElement = task.querySelector('.task-title');
                            const descriptionElement = task.querySelector('.task-description');

                            if (titleElement && descriptionElement) {
                                const title = titleElement.textContent.toLowerCase();
                                const description = descriptionElement.textContent.toLowerCase();

                                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                                    task.style.display = 'flex';
                                    task.style.backgroundColor = 'rgba(255, 165, 89, 0.1)';
                                } else {
                                    task.style.display = 'none';
                                }
                            }
                        });

                        // Search in notes
                        const allNotes = document.querySelectorAll('.note');
                        allNotes.forEach(note => {
                            const titleElement = note.querySelector('.note-title');
                            const contentElement = note.querySelector('.note-content');

                            if (titleElement && contentElement) {
                                const title = titleElement.textContent.toLowerCase();
                                const content = contentElement.textContent.toLowerCase();

                                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                                    note.style.display = 'block';
                                    note.style.backgroundColor = 'rgba(255, 165, 89, 0.1)';
                                } else {
                                    note.style.display = 'none';
                                }
                            }
                        });

                        // Search in transactions
                        const allTransactions = document.querySelectorAll('.transaction-card');
                        allTransactions.forEach(transaction => {
                            const titleElement = transaction.querySelector('.transaction-title');

                            if (titleElement) {
                                const title = titleElement.textContent.toLowerCase();

                                if (title.includes(searchTerm)) {
                                    transaction.style.display = 'block';
                                    transaction.style.backgroundColor = 'rgba(255, 165, 89, 0.1)';
                                } else {
                                    transaction.style.display = 'none';
                                }
                            }
                        });
                    } else {
                        // Reset display
                        const allTasks = document.querySelectorAll('.task-item');
                        allTasks.forEach(task => {
                            task.style.display = 'flex';
                            task.style.backgroundColor = '';
                        });

                        const allNotes = document.querySelectorAll('.note');
                        allNotes.forEach(note => {
                            note.style.display = 'block';
                            note.style.backgroundColor = '';
                        });

                        const allTransactions = document.querySelectorAll('.transaction-card');
                        allTransactions.forEach(transaction => {
                            transaction.style.display = 'block';
                            transaction.style.backgroundColor = '';
                        });
                    }
                });
            });
        }

        // Initialize sortable elements
        function initSortable() {
            // Initialize sortable for task lists
            const taskLists = document.querySelectorAll('.task-list');
            taskLists.forEach(list => {
                new Sortable(list, {
                    animation: 150,
                    ghostClass: 'sortable-ghost',
                    dragClass: 'sortable-drag'
                });
            });

            // Initialize sortable for notes grid
            const notesGrid = document.getElementById('notesGrid');
            if (notesGrid) {
                new Sortable(notesGrid, {
                    animation: 150,
                    ghostClass: 'sortable-ghost',
                    dragClass: 'sortable-drag'
                });
            }
        }

        const utils = {
            getCategoryName: function(category) {
                const categories = {
                    'work': 'Trabajo',
                    'personal': 'Personal',
                    'health': 'Salud',
                    'study': 'Estudio',
                    'other': 'Otros'
                };
                return categories[category] || category;
            },
            getTransactionCategoryName: function(category) {
                const categories = {
                    'food': 'Alimentación',
                    'transport': 'Transporte',
                    'entertainment': 'Entretenimiento',
                    'health': 'Salud',
                    'education': 'Educación',
                    'investment': 'Inversión',
                    'other': 'Otros'
                };
                return categories[category] || category;
            },
            formatDate: function(dateString) {
                const date = new Date(dateString);
                return date.toLocaleDateString();
            },
            parseDate: function(dateString) {
                const parts = dateString.split('/');
                if (parts.length === 3) {
                    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                }
                return dateString;
            }
        };