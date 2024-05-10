import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import CustomAxios from '../../axios/CustomAxios';
const OauthComponent = () => {
    const handleLoginGoogle = () => {
        var uri = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/drive.metadata.readonly&display=popup&include_granted_scopes=true&response_type=code&client_id=${import.meta.env.VITE_google_client_id}&state=google&redirect_uri=http://localhost:3000/oauth`
        window.location.assign(uri);
    };
    const handleLoginFacebook = () => {
        var uri = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${import.meta.env.VITE_facebook_client_id}&redirect_uri=http://localhost:3000/oauth&state=facebook`
        window.location.assign(uri);
    };
    const handleLoginGithub = () => {
        var uri = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_github_client_id}&redirect_uri=http://localhost:3000/oauth&state=github`
        window.location.assign(uri);
    };
    return (
        <div>
            <div>
                <ul className="mt-1 flex justify-center text-gray-400 gap-2">
                    <li>
                        <button onClick={() => handleLoginGoogle()}><GoogleIcon /></button>
                    </li>
                    <li>
                        <button onClick={() => handleLoginGithub()}><GitHubIcon /></button>
                    </li>
                    <li>
                        <button onClick={() => handleLoginFacebook()}><FacebookOutlinedIcon /></button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default OauthComponent;





