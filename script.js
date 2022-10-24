(() => {
   function script () {
      const audio = {
         media: new Audio('music/voland.mp3'),
         started: false,
      };

      const _playMusic = () => {
         audio.media.play();
         audio.started = true;

         const interval = setInterval(() => {
             if (audio.media.volume > 0.95) {
                clearInterval(interval);

                return;
             }

             audio.media.volume += 0.05;
         },800);
      }

      const _populateLetter = (className, letterValue) => {
         const letters = document.querySelectorAll(`.letter.${className}`);

         letters.forEach(letter => {
            letter.classList.add("decoded")
            letter.innerText = letterValue;
         });

         if (!audio.started) {
            _playMusic();
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
            input.addEventListener('input', _letterEnteredHandler);
         });

         document.addEventListener('copy', function(e){
            const selection = document.getSelection() || '';
            let result = selection.toString()
                .toLowerCase()
                .replace(/ /g, '')
                .replace(/\xa0/g, ' ')
                .replace(/\n/g, '')
                .replace(/(^\w|\.\s?\w)/g, m => m.toUpperCase())
                .replace(/\./g, '.\n')

            if (result.length > 190) {
               result += ' 😊';
            }

            e.clipboardData.setData('text/plain', result);

            e.preventDefault();
         });
      }

      const init = () => {
         _initEvents();

         audio.media.volume = 0.05;

         console.log('===========================================================')
         console.log('What are you looking for? There\'s nothing for you here :)')
         console.log('===========================================================')
      }

      return init;
   }

   window.addEventListener('load', script())
})();