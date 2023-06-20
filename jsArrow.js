document.querySelector('.arrow-right').addEventListener('click', function() {
    document.querySelector('.video-row').scrollBy({ top: 0, left: 300, behavior: 'smooth' });
});

document.querySelector('.arrow-left').addEventListener('click', function() {
    document.querySelector('.video-row').scrollBy({ top: 0, left: -300, behavior: 'smooth' });
});
