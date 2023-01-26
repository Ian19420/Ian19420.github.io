
var Btn = null;
function a()
{
    Btn = document.querySelector('input[name = "options"]:checked');
    console.log(Btn);
    var num = true;
    if (Btn != null)
    {
        Btn.onclick = function() {
            if (num)
            {
                num = false;
                Btn.checked = false;
            }
            else
            {
                num = Btn.checked;
            }
        };
    }
}
setInterval(a, 10);