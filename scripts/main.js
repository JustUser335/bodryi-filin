document.addEventListener('DOMContentLoaded',function()
{
    controller.transmitter();
    console.log(1)
});

var controller =
{
    transmitter: function () {
        this.template();

    },
    template: function()
    {
        let babel = this;
        let ratingAll =  $('.rating');
        [].forEach.call(ratingAll, function(e){
            e.addEventListener('mouseover', function (event){
                let target = event.target;
                let hasClassEl = $(target).hasClass('rating');
                if(!hasClassEl){
                    let nextEl = environmentEl(target,'next');
                    let prevEl = environmentEl(target,'prev');
                    prevEl.push(target);
                    fillStar(nextEl);
                    fillStar(prevEl,'#FBFF30');
                }
            });
            e.addEventListener('click', function (event){
                event.preventDefault();
                let target = event.target;
                let hasClassEl = $(target).hasClass('rating');
                if(!hasClassEl){
                    let elNodeName = target.nodeName;
                    target = elNodeName == 'path'?babel.relevatClassEl(target,'rating__svg'):target;
                    target = target[0];
                    let nextEl = environmentEl(target,'next');
                    let prevEl = environmentEl(target,'prev');
                    prevEl.push(target);
                    fillStar(nextEl);
                    fillStar(prevEl,'#FBFF30');
                    alert('Ваш голос засчитан. Спасибо')
                }
            });
        });
        function environmentEl(el,nearEl = 'next'){
            let arr = [], near = false;
            while(true){
                if(nearEl == 'next'){
                    near = near?near.nextElementSibling:el.nextElementSibling;
                }
                if(nearEl == 'prev'){
                    near = near?near.previousElementSibling:el.previousElementSibling;
                }
                if(near){
                    arr.push(near);
                }else{
                    break;
                }
            }
            return arr;
        }
        function fillStar(el,color = '#fff'){
            if(el.length > 0){
                el.forEach(function(e){
                    $(e).find('path').css('fill',color)
                });
            }
        }
    },
    relevatClassEl: function (el,targetClassName,depth = 100){
        let correntParrent,currentClassName, tagNameEl,counter = 0;
        l1: do{
            counter ++;
            if(correntParrent){correntParrent = $(correntParrent).parent();}else{correntParrent = $(el).parent();}
            currentClassName = correntParrent.hasClass(targetClassName);

            tagNameEl =  $(correntParrent).prop("tagName").toLowerCase();
            if(tagNameEl == 'body')break l1;
            if(depth == counter || depth == false)break l1;
            if(currentClassName)break l1;

        }while(true);
        return correntParrent;
    },
}