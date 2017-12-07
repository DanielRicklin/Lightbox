'use strict'

$(document).ready(function () {

    let lightbox = {};
    lightbox.modules = {};

    lightbox.modules.action = (function () {
        let html = [];

        let create = function (id, titre) {
            html.push('<div class="gallery">');
            html.push("<img class='pe' src='" + id + "'>");
            html.push("<h1 class='titre'>" + titre + "</h1>");
            html.push("<button class='close'>X</button>");
            html.push("<button class='move prev'><<</button>");
            html.push("<button class='move next'>>></button>");
            html.push("<div class='commentary'><button class='addCommentary'>Add commentary</button><button class='erase'>Erase</button><div class='comList'></div></div>");
            html.push('</div>');
        }

        let listeners = function (event) {
            $(".close").on('click', (e) => {
                hide();
            });
            $(".prev").on('click', (e) => {
                prev(event);
            });
            $(".next").on('click', (e) => {
                next(event);
            });

            $(document).keydown(function (e) {
                switch (e.which) {
                    case 37:
                        prev(event);
                    case 39:
                        next(event);
                }
            });

            $(".addCommentary").on('click', (e) => {
                getCom(event);
            });
            $(".erase").on('click', (e) => {
                eraseCom(event);
            });
        }

        let show = function () {
            $(html.join('')).appendTo('body');
        }

        let hide = function () {
            $(".gallery").remove();
            html = [];
        }

        let prev = function (e) {
            let id = $(e.target).parent().prev().children().data('img');
            let titre = $(e.target).parent().prev().children().next().text();

            if (typeof id !== 'undefined') {
                hide();
                create(id, titre);
                show();
                var obj = {};
                obj.target = $(e.target).parent().prev().children();
                listeners(obj);
                showCommentary(obj);
            }
        }

        let next = function (e) {
            let id = $(e.target).parent().next().children().data('img');
            let titre = $(e.target).parent().next().children().next().text();

            if (typeof id !== 'undefined') {
                hide();
                create(id, titre);
                show();
                var obj = {};
                obj.target = $(e.target).parent().next().children();
                listeners(obj);
                showCommentary(obj);
            }
        }

        let getCom = function (eventimg) {
            let id = $(eventimg.target).data('img');
            let com = prompt("Votre commentaire");
            if (localStorage.getItem(id)) {
                com = "<span>" + com + "</span> / " + localStorage.getItem(id);
            } else {
                com = "<span>" + com + "</span> " + localStorage.getItem(id);
            }
            localStorage.setItem(id, com);
            showCommentary(eventimg);
        }

        let showCommentary = function (e) {
            let id = $(e.target).data('img');
            $('.comList').text('');
            $(localStorage.getItem(id)).appendTo('.comList');
        }

        let eraseCom = function (eventimg) {
            let id = $(eventimg.target).data('img');
            localStorage.setItem(id, '');
            showCommentary(eventimg);
        }

        let start = function () {
            $("img").on('click', (event) => {
                let id = $(event.target).data('img');
                let titre = $(event.target).next().text();
                create(id, titre);
                show();
                listeners(event);
                showCommentary(event);
            });
        }

        return {
            start
        };

    })();
    lightbox.modules.action.start();
});