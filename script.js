// 👆 mouse-move following code
$("main").on("pointermove", (e) => {
  interacted = true;
  const { x, y } = e.originalEvent;
  const BOX = e.target.getBoundingClientRect();
  const POINT = { x: x - BOX.x, y: y - BOX.y };
  const RATIO = { x: POINT.x / BOX.width, y: POINT.y / BOX.height };
  const CENTER = fromCenter( RATIO );
  // set some css variables referenced in css
  e.target.style.setProperty( "--ratio-x", RATIO.x );
  e.target.style.setProperty( "--ratio-y", RATIO.y );
  e.target.style.setProperty( "--from-center", CENTER );
});

// maths 🤷‍♀️
function fromCenter({ x, y }) {
  return Math.min(Math.max( 0, Math.sqrt( (y - .5) * (y - .5) + (x  - .5) * (x - .5) ) / .5 ), 1 );
}

let interacted = false;

$("img").on("load", () => {
  // ⏰ lazy load triggers opacity  
  $("main").removeClass("loading");
  
  // ✨ little intro demo animation 
  $({foo:0}).animate({foo:(Math.PI*3)}, {
      duration: 8000,
      easing: "swing", 
      step: function(val) {
        if ( !interacted ) {
          document.querySelector("#app").style.setProperty( 
            "--ratio-x", (Math.cos(val) + 1.5) / 3 
          );
          document.querySelector("#app").style.setProperty( 
            "--ratio-y", (Math.sin(val) + 2) / 4  
          );
        }
      } 
  });  
});