import { createBrowserHistory } from "history";

const env = process.env.NODE_ENV;
let publicUrl: string =  '';

if (env === 'development') {
  publicUrl = '/';
} else if (env === 'production') {
  publicUrl = '/tomato_alarm_clock';
}
const customHistory = createBrowserHistory({
  basename: publicUrl
});
export default customHistory;