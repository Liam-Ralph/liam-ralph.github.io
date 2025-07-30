$(function(){
    ["#first-header", "#second-header", "#footer"].forEach(function(item) {
        $(item + "-loader").load("/jquery-elements.html " + item);
    });
});