export default function Banner({link}){
    return<>
        <div className="container-fluid d-flex w-100 m-0 p-0 bg-white position-relative mt-5">
          <img
            src={link}
            className="w-100 m-0 p-0 object-fit-cover"
            style={{ height: "50vh" }}
            alt="Banner"
          />
        </div>
    </>
}