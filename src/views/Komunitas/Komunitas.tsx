import React from 'react'

const Komunitas = () => {
  return (
    <div>
      <div className="container mx-auto mt-10 px-4">
        <header className="mb-20 flex items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Komunitas & Aktivitas</h1>
            <p className="deskripsi max-w-3xl break-words text-justify">
              Menjelajah ke tempat-tempat seperti restoran, kafe, mal,
              supermarket, taman, hingga bengkel memberikan pengalaman yang
              beragam, seperti menikmati kuliner lezat hingga berbelanja semua
              kebutuhan anda, bersantai di alam, memperbaiki kendaraan, dan
              menikmati kopi di suasana yang nyaman.
            </p>
          </div>
          <img
            src="https://images.pexels.com/photos/2962035/pexels-photo-2962035.jpeg"
            alt="Komunitas & Aktivitas"
            style={{ width: "35%", height: "40%", objectFit: "cover" }}
          />
        </header>
      </div>
    </div>
  )
}

export default Komunitas
