// Example topic sets
const topics = {
    GK: [
        { question: "Who is known as the Father of the Nation in India?", answer: "Mahatma Gandhi" },
        { question: "What is the capital of Japan?", answer: "Tokyo" },
        { question: "Which planet is known as the Blue Planet?", answer: "Earth" },
    ],
    CS: [
        { question: "What does CPU stand for?", answer: "Central Processing Unit" },
        { question: "What is the binary number system?", answer: "Base-2 numeral system" },
        { question: "Name the data structure used for FIFO?", answer: "Queue" },
    ],
    HTML: [
        { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
        { question: "Which tag is used to create a hyperlink?", answer: "<a>" },
        { question: "What tag defines a paragraph?", answer: "<p>" },
    ],
    CSS: [
        { question: "What does CSS stand for?", answer: "Cascading Style Sheets" },
        { question: "Which property is used to change text color?", answer: "color" },
        { question: "How do you select an element with id 'header'?", answer: "#header" },
    ],
    JS: [
        { question: "What is the keyword to declare a variable in JS?", answer: "var, let, or const" },
        { question: "How do you write a comment in JavaScript?", answer: "// for single line, /* */ for multi-line" },
        { question: "Which method is used to log to the console?", answer: "console.log()" },
    ],
    TEMP: [
        {
            question: "What can you do?",
            answer: "Nothing!"
        }
    ]
};

let currentTopic = "GK";
let quizData = topics[currentTopic];
let delTopicFromTopics = []; // this array store deleted topics that delete by user but exists in topics object litteral

// DOM Elements
const topicListEl = document.getElementById("topicList");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const card = document.getElementById("flashcard");
const flipBtn = document.getElementById("flipBtn");
const correctBtn = document.getElementById("correctBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const scoreEl = document.getElementById("score");
const correctCountEl = document.getElementById("correctCount");
const totalEl = document.getElementById("total");
const modeToggle = document.getElementById("modeToggle");
const tipsBtn = document.getElementById("tipsBtn");
const tipsModal = document.getElementById("tipsModal");
const closeModalTips = document.querySelector(".close1");
const closeModalQA = document.querySelector(".close2");
const topicsBtn = document.getElementById("topicsBtn");
const topicsDropdownMenu = document.querySelector(".dropdown-menu");
const topicsDropdown = document.getElementById("topicsDropdown");
const addQAModal = document.getElementById("addQAModal");

const addTopicModal = document.getElementById("addTopicModal");
const addTopicsBtn = document.getElementById("addTopics");
const addTopicButton = document.getElementById("addTopicButton");
const closeAddTopicModal = document.getElementById("closeAddTopicModal");
const newTopicInput = document.getElementById("newTopicName");

const resetAllBtn = document.getElementById("resetAllBtn");
const resetTopicBtn = document.getElementById("resetTopicBtn");
const confirmModal = document.getElementById("confirmModal");

const newQuestionInput = document.getElementById("newQuestion");
const newAnswerInput = document.getElementById("newAnswer");
const addQAButton = document.getElementById("addQAButton");

const deleteCardBtn = document.getElementById("deleteCardBtn");

let currentIndex = 0;
let score = 0;
let correctSet = new Set();

function isTopicDeleted(topic) {

    let isDel = false;

    if (delTopicFromTopics.length === 0) {
        return false;
    }

    delTopicFromTopics.forEach((delTopic) => {
        if (delTopic === topic) {
            isDel = true;
        }
    });
    return isDel;
}

// Render topics list on left sidebar and dropdown menu
function renderTopics() {
    topicListEl.innerHTML = "";
    topicsDropdown.innerHTML = "";

    Object.keys(topics).forEach((topic) => {

        if (isTopicDeleted(topic)) {
            console.log(topic)
            return;
        }

        // Sidebar list item and children
        const li = document.createElement("li");

        const topicSpan = document.createElement("span");
        topicSpan.textContent = topic;

        const addQAsBtn = document.createElement("button");
        addQAsBtn.innerHTML = `<i class="ri-add-line"></i>`;
        addQAsBtn.style.display = "none"; // start hidden
        addQAsBtn.id = "addQAsBtn";

        // Title of Add QA btn
        const QaDiv = document.createElement("div");
        QaDiv.className = "hoverTitleOfBtn";
        QaDiv.textContent = "Add Question";

        addQAsBtn.appendChild(QaDiv);

        const removeCurrTopic = document.createElement("button");
        removeCurrTopic.innerHTML = `<i class="ri-delete-bin-line"></i>`;
        removeCurrTopic.style.display = "none";
        removeCurrTopic.id = "removeCurrTopicBtn";

        // Title of remove btn
        const removeDiv = document.createElement("div");
        removeDiv.className = "hoverTitleOfBtn";
        removeDiv.textContent = "Delete Topic";

        removeCurrTopic.appendChild(removeDiv);

        li.appendChild(topicSpan);
        li.appendChild(removeCurrTopic);
        li.appendChild(addQAsBtn);

        if (topic === currentTopic) {
            li.classList.add("selected");
        }

        li.addEventListener("mouseenter", () => {
            addQAsBtn.style.display = "inline-block";
            removeCurrTopic.style.display = "inline-block";
        });
        li.addEventListener("mouseleave", () => {
            addQAsBtn.style.display = "none";
            removeCurrTopic.style.display = "none";
        });

        li.addEventListener("click", () => {
            if (topic !== currentTopic) {
                currentTopic = topic;
                quizData = topics[currentTopic];
                resetQuiz();
                renderTopics();
                closeDropdown();
            }
        });

        topicListEl.appendChild(li);

        // Dropdown list item and children — new separate elements
        const ddLi = document.createElement("li");

        const ddTopicSpan = document.createElement("span");
        ddTopicSpan.textContent = topic;

        const ddaddQAsBtn = document.createElement("button");
        ddaddQAsBtn.innerHTML = `<i class="ri-add-line"></i>`;
        ddaddQAsBtn.style.display = "none";

        const ddremoveCurrTopic = document.createElement("button");
        ddremoveCurrTopic.innerHTML = `<i class="ri-delete-bin-line"></i>`;
        ddremoveCurrTopic.style.display = "none";
        ddremoveCurrTopic.id = "removeCurrTopicBtn";


        ddLi.appendChild(ddTopicSpan);
        ddLi.appendChild(ddremoveCurrTopic);
        ddLi.appendChild(ddaddQAsBtn);

        if (topic === currentTopic) {
            ddLi.classList.add("selected");
            ddaddQAsBtn.style.display = "inline-block";
            ddremoveCurrTopic.style.display = "inline-block";
        }

        ddLi.addEventListener("click", () => {
            if (topic !== currentTopic) {
                currentTopic = topic;
                quizData = topics[currentTopic];
                resetQuiz();
                renderTopics();
                closeDropdown();
            }
        });

        topicsDropdown.appendChild(ddLi);

        // topicsDropdownMenu
        const crrTopicInAddQA = document.getElementById("crrTopicInAddQA");
        crrTopicInAddQA.textContent = currentTopic;

        ddaddQAsBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent triggering li click
            addQAModal.style.display = "block";
        });

        addQAsBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent triggering li click
            addQAModal.style.display = "block";
        });

        removeCurrTopic.addEventListener("click", (e) => {
            e.stopPropagation();
            showConfirmation(
                "Delete Topic",
                `Are you sure you want to delete the Topic: "${ currentTopic }"?`,
                () => {
                    deleteTopicData(currentTopic);

                    delTopicFromTopics[delTopicFromTopics.length] = currentTopic;
                    saveDelTopicsToLocalStorage();

                    removeCurrTopic.parentNode.remove();

                    showNotification(`${ currentTopic } is deleted.`);

                    let tempArr = Object.keys(topics);
                    if (tempArr.length > 0) {
                        currentTopic = tempArr[0];
                    } else {
                        currentTopic = null;
                    }


                    const leftSideBar = document.querySelector(".left-sidebar");
                    leftSideBar.appendChild(topicListEl);

                    resetQuiz();
                    renderTopics();
                }
            );
        });
        ddremoveCurrTopic.addEventListener("click", (e) => {
            e.stopPropagation();
            showConfirmation(
                "Delete Topic",
                `Are you sure you want to delete the Topic: "${ currentTopic }"?`,
                () => {

                    deleteTopicData(currentTopic);

                    delTopicFromTopics[delTopicFromTopics.length] = currentTopic;
                    saveDelTopicsToLocalStorage();

                    removeCurrTopic.parentNode.remove();

                    showNotification(`${ currentTopic } is deleted.`);

                    let tempArr = Object.keys(topics);

                    if (tempArr.length > 0) {
                        currentTopic = tempArr[0];
                    } else {
                        currentTopic = null;
                    }

                    topicsDropdownMenu.appendChild(topicsDropdown);

                    resetQuiz();
                    renderTopics();

                }
            );
        });
    });

    totalEl.textContent = quizData.length;

}

function resetQuiz() {
    quizData = topics[currentTopic]; // ensure latest data
    currentIndex = 0;

    const savedScore = localStorage.getItem('quizScore_' + currentTopic);
    score = savedScore ? parseInt(savedScore, 10) : 0;

    let savedCorrectSet = localStorage.getItem('correctSet_' + currentTopic);
    try {
        const parsedSet = JSON.parse(savedCorrectSet);
        correctSet = Array.isArray(parsedSet) ? new Set(parsedSet) : new Set();
    } catch (e) {
        correctSet = new Set();
    }

    let savedDelTopics = localStorage.getItem("delTopicsData");
    delTopicFromTopics = savedDelTopics ? JSON.parse(savedDelTopics) : [];

    scoreEl.textContent = score;
    correctCountEl.textContent = correctSet.size;

    showCard(currentIndex);
}

function showCard(index) {
    if (!quizData || !quizData.length || !quizData[index]) {
        questionEl.textContent = "No question available.";
        answerEl.textContent = "";
        return;
    }
    card.classList.remove("flipped");
    questionEl.textContent = quizData[index].question;
    setTimeout(() => {
        answerEl.textContent = quizData[index].answer;
    }, 500);
    correctBtn.style.display = "none";
    flipBtn.style.display = "inline-block";
}

flipBtn.addEventListener("click", () => {
    card.classList.add("flipped");
    correctBtn.style.display = "inline-block";
    flipBtn.style.display = "none";
});

correctBtn.addEventListener("click", () => {
    if (!correctSet.has(currentIndex)) {
        score++;
        correctSet.add(currentIndex);

        scoreEl.textContent = score;
        correctCountEl.textContent = correctSet.size;

        // Save to localStorage
        localStorage.setItem('quizScore_' + currentTopic, score);
        localStorage.setItem('correctSet_' + currentTopic, JSON.stringify(Array.from(correctSet)));
    }
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % quizData.length;
    showCard(currentIndex);
});

backBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + quizData.length) % quizData.length;
    showCard(currentIndex);
});

// Delete current card button
deleteCardBtn.addEventListener("click", () => {
    if (quizData.length === 0) {
        alert("No cards available to delete.");
        return;
    }
    showConfirmation(
        "Delete Card",
        `Are you sure you want to delete the card: "${ quizData[currentIndex].question }"?`,
        () => {
            // Remove current card from quizData
            quizData.splice(currentIndex, 1);

            saveTopicsToLocalStorage();

            // Reset currentIndex if it exceeds new length
            if (currentIndex >= quizData.length) {
                currentIndex = quizData.length - 1;
            }

            // Show next card or reset if no cards left
            if (quizData.length > 0) {
                showCard(currentIndex);
            } else {
                questionEl.textContent = "No cards available.";
                answerEl.textContent = "";
            }

            // Update the score and correctSet to the Local Storage
            if (score !== 0) {
                score--;
                localStorage.setItem('quizScore_' + currentTopic, score);
            }
            correctSet.delete(currentIndex + 1);
            localStorage.setItem('correctSet_' + currentTopic, JSON.stringify(Array.from(correctSet)));

            scoreEl.textContent = score;
            correctCountEl.textContent = correctSet.size;
            totalEl.textContent = quizData.length;

            showNotification("Card deleted successfully!");
        }
    );
});

// DARK MODE PERSISTENCE
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    modeToggle.innerHTML = `<i class="ri-sun-line"></i>`;
} else {
    modeToggle.innerHTML = `<i class="ri-moon-line"></i>`;
}

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
        modeToggle.innerHTML = `<i class="ri-sun-line"></i>`;
    } else {
        localStorage.setItem('darkMode', 'disabled');
        modeToggle.innerHTML = `<i class="ri-moon-line"></i>`;
    }
});


// Add new Q&A to current topic
addQAButton.addEventListener("click", () => {
    const question = newQuestionInput.value.trim();
    const answer = newAnswerInput.value.trim();

    if (!question || !answer) {
        alert("Please enter both question and answer.");
        return;
    }

    // Check for duplicates
    const alreadyExists = topics[currentTopic].some(
        qa => qa.question === question && qa.answer === answer
    );

    if (alreadyExists) {
        alert("This question already exists.");
        return;
    }

    // Add new Q&A to the current topic array
    topics[currentTopic].push({ question, answer });
    saveTopicsToLocalStorage();

    // Clear inputs and close modal
    newQuestionInput.value = "";
    newAnswerInput.value = "";
    addQAModal.style.display = "none";

    quizData = topics[currentTopic];
    renderTopics();
    resetQuiz();

    showNotification("New question added!");
});


// Save topics object to localStorage (stringify)
function saveTopicsToLocalStorage() {
    localStorage.setItem("topicsData", JSON.stringify(topics));
}

// Updated loadTopicsFromLocalStorage to support user-added topics
function loadTopicsFromLocalStorage() {
    const savedTopics = localStorage.getItem("topicsData");
    if (savedTopics) {
        try {
            const parsed = JSON.parse(savedTopics);
            // Merge all topics, including new user-created ones
            Object.keys(parsed).forEach(topic => {
                if (!isTopicDeleted(topic)) {
                    topics[topic] = parsed[topic];
                }
            });
        } catch (e) {
            console.error("Failed to parse saved topics", e);
        }
    }
}

function saveDelTopicsToLocalStorage() {
    localStorage.setItem("delTopicsData", JSON.stringify(delTopicFromTopics));
}

function loadDelTopicsToLocalStorage() {
    const savedDelTopics = localStorage.getItem("delTopicsData");

    if (savedDelTopics) {
        try {
            const parsed = JSON.parse(savedDelTopics);
            // Merge all topics, including new user-created ones
            parsed.forEach((topic) => {
                if (!isTopicDeleted(topic)) {
                    delTopicFromTopics.push(topic);
                }
            });
        } catch (e) {
            console.error("Failed to parse saved Delete topics", e);
        }
    }
}

// Tips modal
tipsBtn.addEventListener("click", () => {
    tipsModal.style.display = "block";
});

closeModalTips.addEventListener("click", () => {
    tipsModal.style.display = "none";
});
closeModalQA.addEventListener("click", () => {
    addQAModal.style.display = "none";
});

// Close tips modal if clicked outside the modal content
window.addEventListener("click", (e) => {
    if (e.target == tipsModal) {
        tipsModal.style.display = "none";
    }
});

// Reset all progress button with confirmation modal
resetAllBtn.addEventListener("click", () => {
    showConfirmation(
        "Reset All Progress",
        "Are you sure you want to reset ALL saved progress? This cannot be undone.",
        () => {
            clearAllSavedData();
            showNotification("All progress has been reset!");
        }
    );
});

// Reset current topic progress button with confirmation modal
resetTopicBtn.addEventListener("click", () => {
    showConfirmation(
        `Reset ${ currentTopic } Progress`,
        `Are you sure you want to reset your progress for ${ currentTopic }?`,
        () => {
            deleteTopicData(currentTopic);
            showNotification(`${ currentTopic } progress has been reset!`);
        }
    );
});

/**
 * Clears all saved progress from localStorage for all topics.
 */
function clearAllSavedData() {
    Object.keys(topics).forEach(topic => {
        localStorage.removeItem(`quizScore_${ topic }`);
        localStorage.removeItem(`correctSet_${ topic }`);
    });
    resetQuiz();
}

/**
 * Deletes saved progress for a specific topic.
 * @param {string} topic - The topic whose saved data to delete.
 */
function deleteTopicData(topic) {
    localStorage.removeItem(`quizScore_${ topic }`);
    localStorage.removeItem(`correctSet_${ topic }`);
    if (currentTopic === topic) resetQuiz();
}


/**
 * Shows a confirmation modal with a title, message, and callback for confirmation.
 * @param {string} title - Modal title text.
 * @param {string} message - Modal message text.
 * @param {Function} callback - Function to run if user confirms.
*/
function showConfirmation(title, message, callback) {

    closeDropdown();

    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    confirmModal.style.display = "block";


    const confirmAction = () => {
        callback();
        confirmModal.style.display = "none";
        confirmActionBtn.removeEventListener("click", confirmAction);
    };

    confirmActionBtn.addEventListener("click", confirmAction);

    // Cancel button closes modal without action
    cancelActionBtn.addEventListener("click", () => {
        confirmModal.style.display = "none";
        confirmActionBtn.removeEventListener("click", confirmAction);
    });
}

/**
 * Shows a temporary notification message at the bottom of the screen.
 * @param {string} message - Text to display in the notification.
 */
function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    // Fade out and remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add("fade-out");
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}


// Toggle topics dropdown menu visibility
topicsBtn.addEventListener("click", () => {
    topicsDropdownMenu.classList.add("show");
});

// Close topics dropdown
function closeDropdown() {
    topicsDropdownMenu.classList.remove("show");
}

// Close topics dropdown if clicked outside
window.addEventListener("click", (e) => {
    if (!topicsBtn.contains(e.target) && !topicsDropdown.contains(e.target)) {
        closeDropdown();
    }
});

addTopicsBtn.addEventListener("click", () => {
    addTopicModal.style.display = "block"; // Open modal to add new topic
});

addTopicButton.addEventListener("click", () => {
    const topicName = newTopicInput.value.trim();
    if (!topicName) {
        alert("Please enter a topic name.");
        return;
    }
    if (topicName && !topics[topicName]) {
        topics[topicName] = [];
        saveTopicsToLocalStorage();
        renderTopics();
        showNotification(`${ topicName } added as a new topic.`);
    } else if (topics[topicName]) {
        alert("Topic already exists!");
    }
    newTopicInput.value = ""; // Clear input after use
    addTopicModal.style.display = "none"; // Close modal after adding
    resetQuiz(); // Reset quiz to show new topic
});

// Close add topic modal
closeAddTopicModal.addEventListener("click", () => {
    addTopicModal.style.display = "none";
});



// Initialize app
loadTopicsFromLocalStorage();
loadDelTopicsToLocalStorage();
renderTopics();
resetQuiz();