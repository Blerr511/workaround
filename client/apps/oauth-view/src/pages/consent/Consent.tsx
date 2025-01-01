import './consent.css';
import { IPageProps } from '../../AppServer.props';

export interface ConsentPageProps {
  appName: string;
}

export const ConsentPage = (props: IPageProps<ConsentPageProps>) => {
  return (
    <div className="consent-page">
      <div className="consent-header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google Logo"
          className="google-logo"
        />
        <h1>Sign in with Google</h1>
      </div>
      <div className="consent-body">
        <p>
          <strong>${props.appName}</strong> wants to access your Google Account.
        </p>
        <ul>
          <li>View your email address</li>
          <li>Manage your calendar events</li>
        </ul>
        <p>
          Make sure you trust <strong>[Your App Name]</strong>. You can always
          manage your app permissions in your Google Account settings.
        </p>
      </div>
      <div className="consent-footer">
        <button className="consent-button approve">Allow</button>
        <button className="consent-button deny">Deny</button>
      </div>
    </div>
  );
};
