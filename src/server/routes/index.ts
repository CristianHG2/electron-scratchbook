import {action} from '../lib/newton';
import getIssues from '../lib/zenhub/requests/get-issues';
import transform from '../lib/zenhub/transform';

export default [
  action('Dashboard', async () => {
    const users = transform(await getIssues());

    return {
      assignees: users.perAssignee()
    };
  })
];
