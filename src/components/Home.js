import LinkList from './LinkList';
import Notification from './Notification';

const authToken = localStorage.getItem("AUTH_TOKEN");

export default () => authToken && <>
    <LinkList />
    <Notification />
</>