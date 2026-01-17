
document.addEventListener('DOMContentLoaded', function () {

    const ingredients = document.querySelectorAll('.product-lymph-ingredient');
    ingredients.forEach(ingredient => {
        ingredient.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('active');
            const content = this.querySelector('.product_lymph-ingr-content');
            if (this.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.marginTop = "12px";
                content.style.opacity = "1";
            } else {
                content.style.maxHeight = null;
                content.style.marginTop = null;
                content.style.opacity = "0";
            }
        });
    });

});
