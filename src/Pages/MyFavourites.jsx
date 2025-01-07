import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Porvider/AuthProvider";
import Loading from "./Loading";
import { AiFillStar  } from "react-icons/ai";



import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MyFavourites = () => {
  const { user, loading } = useContext(AuthContext);

  const [movies, setMovies] = useState([]);




  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://a-10-movielify-server.vercel.app/favorite/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
         
       
        setMovies(data);
       
      })
      .catch((error) => {
        console.error("Error fetching favorite movies:", error);
      });
  }, [user?.email]);

//   delete function 

  const handleDelete =(id)=>{
    console.log('delete', id)
    // delete from the database
    fetch(`https://a-10-movielify-server.vercel.app/favorite/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            if (data.deletedCount) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                const remainingMovie = movies.filter(movie => movie._id !== id);
                setMovies(remainingMovie);

            }
        })
    }



  if (loading) {
    return <Loading />;
  }


  if (movies.length == 0) {
    return (
      <div className="py-[100px]">
        <h2 className="text-4xl text-center font-bold">
          Please Add Some Favorite Movie
        </h2>
        
      </div>
    );
  }

  return (
    <section className='lg:container px-4 mx-auto py-12'>
    {/* <Helmet> <title>Bite Bank | Manage Food </title></Helmet> */}
    <div className='flex items-center gap-x-3 flex-col sm:flex-row gap-5'>
      <h2 className='text-4xl font-semibold  '>My Favorite Movies</h2>

      <span className='px-3 py-1 mt-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
        {movies.length} Movies
      </span>
    </div>

    <div className='flex flex-col mt-6'>
      <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
          <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                  >
                    <div className='flex items-center gap-x-3'>
                      <span>Title</span>
                    </div>
                  </th>

                  <th
                    scope='col'
                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                  >
                    <span>Category</span>
                  </th>

                  <th
                    scope='col'
                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                  >
                    <button className='flex items-center gap-x-2'>
                      <span>Duration</span>
                    </button>
                  </th>

                  <th
                    scope='col'
                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                  >
                    Rating
                  </th>
                  <th
                    scope='col'
                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                  >
                    Poster
                  </th>

                  <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200 '>
                {/* Generate dynamic tr */}
                {movies.map(movie => (
                  <tr key={movie._id}>
                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                      {movie.title}({movie.year})
                    </td>

                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                      {movie.genre}
                    </td>

                    <td className='px-4 py-4 text-sm text-gray-500   whitespace-nowrap'>
                      {movie.duration} Minutes
                    </td>
                    <td className='px-4 flex gap-1 py-4 text-sm text-gray-500   whitespace-nowrap'>
                      <p className='flex items-center mt-3'>{movie.rating} <AiFillStar className='text-yellow-500'></AiFillStar></p>
                    </td>
                   
                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                      <img src={movie.poster} className='h-10 w-10 rounded-full' alt="" />
                    </td>
                    
                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                      <div className='flex items-center gap-x-6'>
                      <Link>
                      <button
                          onClick={() => handleDelete(movie._id)}
                          className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                            />
                          </svg>
                        </button>
                      </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default MyFavourites;
