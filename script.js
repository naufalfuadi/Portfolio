const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

function setActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.remove("underline", "underline-offset-7", "text-[#5B8FB9]");

    if (link.getAttribute("href") === `#${id}`) {
      link.classList.add("underline", "underline-offset-7", "text-[#5B8FB9]");
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  {
    threshold: 0.3,
  },
);

sections.forEach((section) => observer.observe(section));

// Fetch API dengan Get Joke
const jokeElement = document.getElementById("joke");
const refreshBtn = document.getElementById("refresh-joke");

async function getJoke() {
  try {
    jokeElement.textContent = "Loading...";

    const response = await fetch("https://v2.jokeapi.dev/joke/Programming");
    const data = await response.json();
    let joke;

    if (data.type === "single") {
      joke = data.joke;
    } else if (data.type === "twopart") {
      joke = data.setup + " " + data.delivery;
    }

    jokeElement.textContent = `"${joke}"`;
  } catch (error) {
    jokeElement.textContent = "-_-";
    console.error(error);
  }
}

refreshBtn.addEventListener("click", getJoke);

getJoke();
