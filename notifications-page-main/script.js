const getMarkAsRead = document.querySelector('.header__mark-as-read');
const getNotifications = document.querySelectorAll('.notifications');
const getPopUpNotifications = document.querySelector('.header__text-1').querySelector('span');

const markAllAsRead = () => {
    getMarkAsRead.addEventListener('click', () => {
        getPopUpNotifications.style.display = 'none';
        getNotifications.forEach((notification) => {
            notification.classList.remove('notifications__not-read')
            notification.querySelector('span').style.display = "none";
        })
    })
}

markAllAsRead()