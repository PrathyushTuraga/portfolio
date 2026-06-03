/* portfolio.js — Top nav, mobile sidebar, chatbot scroll fix */
(function() {
  'use strict';

  var sidebar = document.getElementById('sidebar');
  var toggle = document.querySelector('.mobile-toggle');
  var navLinks = document.querySelectorAll('#topnav a');

  // Mobile sidebar toggle
  if (toggle && sidebar) {
    toggle.addEventListener('click', function() {
      sidebar.classList.toggle('open');
    });
  }

  document.addEventListener('click', function(e) {
    if (sidebar && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });

  // Active nav link on scroll
  var sections = document.querySelectorAll('.section[id]');
  function updateActiveNav() {
    var scrollPos = window.scrollY + 80;
    for (var j = sections.length - 1; j >= 0; j--) {
      if (sections[j].offsetTop <= scrollPos) {
        for (var k = 0; k < navLinks.length; k++) {
          navLinks[k].classList.remove('active');
          if (navLinks[k].getAttribute('href') === '#' + sections[j].id) {
            navLinks[k].classList.add('active');
          }
        }
        break;
      }
    }
  }

  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('load', updateActiveNav);

  // Fix chatbot scroll-to-top:
  // AIchat.v1.js creates <a id="chat-head" href="#"> on $(document).ready
  // The href="#" causes page to jump to top on click.
  // Use jQuery delegated event (jQuery is loaded before this script)
  // to intercept ALL clicks on #chat-head, including future ones.
  $(document).on('click', '#chat-head', function(e) {
    e.preventDefault();
  });
})();