'use strict'

let img = $('img');
let imgCourante, nextDiv, nextImg, nextH1, nbImage;

$(img).click(function () {
    $(".gallery-container").after($("<img>").attr('src', this.attributes[0].value).attr('class', 'pe'));
    $(".gallery-container").after($("<button>").text("X").attr('class', 'close'));
    $(".gallery-container").after($("<button>").text("<<").attr('class', 'move prev'));
    $(".gallery-container").after($("<button>").text(">>").attr('class', 'move next'));

    imgCourante = this;
    let titre = $(imgCourante).parent().find("div");
    $(".gallery-container").after($("<h1>").text(titre.text()).attr('class', 'titre'));
    for (let i = 0; i < img.length; i++) {
        if ($(imgCourante).attr('data-img') == img[i]['attributes'][0]['value']) {
            nbImage = i;
        }
    }
});

$(document).on('click', '.next', function () {
    $(".pe").remove();
    $(".titre").remove();
    nextDiv = $(imgCourante).parent().next();
    nextH1 = nextDiv.find("div");
    nextImg = nextDiv.find("img");
    //let srcImg = $(img[i+1]);
    //console.log(nextDiv);
    //console.log(nextImg);
    $(".gallery-container").after($("<img>").attr('src', nextImg.attr('data-img')).attr('class', 'pe'));
    $(".gallery-container").after($("<h1>").text(nextH1.text()).attr('class', 'titre'));
});

$(document).on('click', '.close', function () {
    $(".pe").remove();
    $('.close').remove();
    $('.move').remove();
    $('.titre').remove();
});