import AppLayout from "../../common/layouts/AppLayout/AppLayout";

export default function WelcomePage() {
  return (
    <AppLayout>
      <div className="w-full flex justify-center">
        <div className="relative bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 p-6 rounded-3xl shadow-2xl">
          <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl">
            <iframe
              width="570"
              height="315"
              src="https://www.youtube.com/embed/kX77h7EpPOk?si=xZuBT82EbpyRCN3z"
              title="Presentación de AprendIA"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
