class Lesson {
    constructor(title, introduction, content, assignments = []) {
        this.title = title;
        this.introduction = introduction;
        this.content = content;
        this.assignments = assignments;
        this.completed = false;
    }

    toggleCompletion() {
        this.completed = !this.completed;
    }
}

class CourseManager {
    constructor(lessons) {
        this.lessons = lessons;
        this.currentIndex = 0;
    }

    get currentLesson() {
        return this.lessons[this.currentIndex];
    }

    get progress() {
        const completed = this.lessons.filter(lesson => lesson.completed).length;
        return (completed / this.lessons.length) * 100;
    }

    navigate(direction) {
        if (direction === 'previous' && this.currentIndex > 0) {
            this.currentIndex--;
            return true;
        }
        if (direction === 'next' && this.currentIndex < this.lessons.length - 1) {
            this.currentIndex++;
            return true;
        }
        return false;
    }
}

class CourseUI {
    constructor(manager) {
        this.manager = manager;
        this.bindElements();
        this.bindEvents();
        this.render();
    }

    bindElements() {
        this.sidebar = document.getElementById('sidebar');
        this.lessonTitle = document.getElementById('lessonTitle');
        this.introduction = document.getElementById('introduction');
        this.lessonBody = document.getElementById('lessonBody');
        this.assignments = document.getElementById('assignments');
        this.progressFill = document.getElementById('progressFill');
        this.progressPercentageBox = document.getElementById('progressPercentageBox');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.completeBtn = document.getElementById('completeBtn');
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.handleNavigation('previous'));
        this.nextBtn.addEventListener('click', () => this.handleNavigation('next'));
        this.completeBtn.addEventListener('click', () => this.toggleCompletion());
        this.sidebar.addEventListener('click', (e) => this.handleLessonClick(e));
    }

    handleNavigation(direction) {
        if (this.manager.navigate(direction)) {
            this.render();
        }
    }

    handleLessonClick(event) {
        const lessonItem = event.target.closest('.lesson-item');
        if (lessonItem) {
            const index = parseInt(lessonItem.dataset.index);
            this.manager.currentIndex = index;
            this.render();
        }
    }

    toggleCompletion() {
        this.manager.currentLesson.toggleCompletion();
        this.render();
    }

    renderSidebar() {
        this.sidebar.innerHTML = this.manager.lessons
            .map((lesson, index) => `
                <div class="lesson-item ${index === this.manager.currentIndex ? 'active' : ''}" 
                    data-index="${index}">
                    ${lesson.completed ? '✓ ' : ''}${lesson.title}
                </div>
            `).join('');
    }

    renderContent() {
        const current = this.manager.currentLesson;
        this.lessonTitle.textContent = current.title;
        this.introduction.innerHTML = current.introduction;
        this.lessonBody.innerHTML = current.content;
        this.assignments.innerHTML = current.assignments
            .map(link => `
                <a href="${link.url}" class="assignment-link" target="_blank">
                    ${link.title}
                </a>
            `).join('');

        const progress = this.manager.progress;
        this.progressFill.style.width = `${progress}%`;
        this.progressPercentageBox.textContent = `${Math.round(progress)}%`;
        
        this.prevBtn.disabled = this.manager.currentIndex === 0;
        this.nextBtn.disabled = this.manager.currentIndex === this.manager.lessons.length - 1;
        this.completeBtn.textContent = current.completed ? 
            'Mark Incomplete' : 'Mark as Complete';
    }

    render() {
        this.renderSidebar();
        this.renderContent();
    }
}

// Initialize Course
const lessons = [
    new Lesson(
        "How This Course Will Work",
        "Welcome to the 9DIII project! This course will teach you modern web development through hands-on projects...",
        `<p>In this module you'll learn:</p>
         <ul>
            <li>Course structure and expectations</li>
            <li>Development environment setup</li>
            <li>Project-based learning approach</li>
         </ul>`,
        [
            { title: "Course Syllabus PDF", url: "#" },
            { title: "Development Setup Guide", url: "#" }
        ]
    ),
    new Lesson(
        "JavaScript Fundamentals",
        "Master the core concepts of JavaScript programming language...",
        `<p>Key topics include:</p>
         <ul>
            <li>Variables and data types</li>
            <li>Functions and scope</li>
            <li>DOM manipulation</li>
         </ul>`,
        [
            { title: "JavaScript Exercises", url: "#" },
            { title: "Practice Project Repo", url: "#" }
        ]
    )
];

const courseManager = new CourseManager(lessons);
const courseUI = new CourseUI(courseManager);