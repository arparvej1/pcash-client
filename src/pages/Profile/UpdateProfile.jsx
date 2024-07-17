import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';
import useUploadImage from '../../hooks/useUploadImage';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpdateProfile = () => {
  const { user, onAuthStateChanged } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const uploadImage_imgbb = useUploadImage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const uploadImage = e.target.profilePicture;
    let profilePicture;
    if (uploadImage.files[0]) {
      profilePicture = await uploadImage_imgbb(uploadImage);
      if (!profilePicture) return;
    } else {
      profilePicture = user.photo_url;
    }

    const name = e.target.name.value;

    // create user in firebase
    const userUpdateData = { name, photo_url: profilePicture };
    console.log('click Update', userUpdateData);
    // --------- send server start -----
    axiosSecure.post(`/profile-update`, userUpdateData)
      .then(function (response) {
        console.log(response.data);
        toast.success('Profile Update Successfully!');
        console.log('Profile Update Successfully!');
        onAuthStateChanged();
        navigate('/profile');
      })
      .catch(function (error) {
        console.log(error);
        if (error?.response?.data.slice(0, 1) !== '<') {
          toast.error(error?.response?.data?.error);
        } else {
          toast.error('Profile Update failed!');
        }
      });
    // --------- send server end -----
  };

  return (
    <div className='md:4/5 lg:w-2/3 mx-auto'>
      <Helmet>
        <title> Update Profile | pCash </title>
      </Helmet>
      <div className='flex flex-col gap-3'>
        <h3 className='font-bold text-4xl'>Update Profile</h3>
        <div className='flex flex-col md:flex-row items-center gap-5 bg-base-200 p-8 rounded-xl'>
          <div className=''>
            <img className='w-32 h-32 rounded-full' src={user.photo_url || "https://i.ibb.co/ZT5tByN/avatar-15-blue.jpg"} alt={user.name} />
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-semibold'>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.mobileNumber}</p>
          </div>
        </div>
        {/* ----- Personal Information ------ */}
        <div className='flex flex-col gap-3 md:gap-5 bg-base-200 p-6 md:p-8 rounded-xl rounded-tl-none'>
          <h3 className='font-semibold text-xl md:text-2xl underline'>Personal Information</h3>
          <form onSubmit={handleUpdateUser} className='flex flex-col gap-3 '>
            <div>
              <span>Full Name</span>
              <input type="text" name='name' defaultValue={user.name} placeholder="Full Name" className="input input-bordered w-full" />
            </div>
            <div>
              <span>Profile Picture (Keep the current image if no new one is chosen.)</span>
              <label htmlFor="profilePicture">
                <input type="file" name="profilePicture" className="file-input file-input-bordered w-full" />
              </label>
            </div>
            <div>
              <input type="submit" value='Update Information' className="btn btn-primary w-full font-semibold text-xl" />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfile;