(() => {
   function script () {
      const audio = {
         media: new Audio('music/voland.mp3'),
         started: false,
      };

      const _populateLetter = (className, letterValue) => {
         const letters = document.querySelectorAll(`.letter.${className}`);

         letters.forEach(letter => {
            letter.classList.add("decoded")
            letter.innerText = letterValue;
         });

         if (!audio.started) {
            audio.media.play();
         }
      };

      const _disableDecodeForClassName = (className) => {
         const letters = document.querySelectorAll(`.letter.${className}`);

         letters.forEach(letter => {
            letter.classList.remove("decoded");
            letter.innerText = '';
         });
      };

      const _letterEnteredHandler = (event) => {
         const targetClass = event.target.getAttribute("data-class");

         if (targetClass) {
            const inputValue = event.target.value.toUpperCase();

            if (inputValue) {
               _populateLetter(targetClass, inputValue);
            } else {
               _disableDecodeForClassName(targetClass)
            }
         }
      };

      const _initEvents = () => {
         const inputs = document.querySelectorAll('input');

         inputs.forEach(input => {
            input.addEventListener('keyup', _letterEnteredHandler);
         });

         document.addEventListener('copy', function(e){
            const selection = document.getSelection();

            e.clipboardData.setData('text/plain',
                selection.toString()
                    .toLowerCase()
                    .replace(/ /g, '')
                    .replace(/\xa0/g, ' ')
                    .replace(/\n/g, '')
                    .replace(/(^\w|\.\s?\w)/g, m => m.toUpperCase())
                    .replace(/\./g, '.\n')
            );

            e.preventDefault();
         });
      }

      const init = () => {
         _initEvents();

         console.log('===========================================================')
         console.log('What are you looking for? There\'s nothing for you here :)')
         console.log('===========================================================')
      }

      return init;
   }

   window.addEventListener('load', script())
})();