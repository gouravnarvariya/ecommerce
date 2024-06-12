import  { useEffect, useState } from 'react'
const InternetModal = () => {
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);
    // console.log(isOnline)

    useEffect(() => {
        
        const handleOnlineStatus = () => {
            setIsOnline(window.navigator.onLine);
        };

        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);

        return () => {
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline', handleOnlineStatus);
        };
    }, []);

  return (
    <div className={`modal ${!isOnline ? 'visible' : 'invisible'}`}>
        <div className={`${!isOnline ? 'visible' : 'invisible'}`}>
            <img src="https://media.istockphoto.com/id/1311405232/vector/currently-online-offline-background-stock-illustration.jpg?s=612x612&w=0&k=20&c=cqHQ5ifUUQZy_R_IOa0dnVjXfl37eyFxZVDog7VJekM=" alt="" />
        </div>
    </div>
  )
}

export default InternetModal