import { apiCall, teamworkApiCall } from '../../services/api';

const handleLocalApiRequest = (data, endpoint) => {
    return new Promise((resolve,reject) => {
      setTimeout(()=> {
  			console.log(data)
        return apiCall('post', `/api/${endpoint}`, data)
        .then((res) => {
          resolve(res);
          console.log(res);
        })
        .catch(err => {
          reject(err);
        })
      }, 1000)
    });
}

const handleApiRequest = (project_id,key) => {
  const url = `https://taxsamaritan.teamwork.com/projects/${project_id}/posts.json`;
	return new Promise((resolve,reject) => {
  	return teamworkApiCall('get', url, key)
  	.then(async (data) => {
      const message = data.posts.filter(m => m.title === 'Internal Project Status Notes')[0];
      if (message) {
        const messageData = {
          projectId: message['project-id'],
          messageId: message.id
        }
        let result = await handleLocalApiRequest(messageData, 'projects/update-message-id');
        resolve(result);
      } else {
        resolve(`No Internal Project Status Notes for ${project_id}`)
      }
  	})
  	.catch(err => {
  		reject(err);
  	})
	});
}

export function getMessages(project_id,key) {
  return async (dispatch) => {
    let result = await handleApiRequest(project_id,key);
    console.log(result)
  }
}

const handleMessageReplyApiRequest = (project_id,message_id,key) => {
  const url = `https://taxsamaritan.teamwork.com/messages/${message_id}/replies.json`;
  return new Promise((resolve,reject) => {
    return teamworkApiCall('get',url,key)
    .then(async(res) => {
      const formattedMessageReplies = [];
      for (let m of res.getMessageReplies) {
        formattedMessageReplies.push({
          teamwork_id: m.id,
          projectId: project_id,
          messageId: m.messageId,
          isRead: m.isRead,
          numNotified: m.numNotified,
          postedOn: m['posted-on'],
          authorAvatarUrl: m['author-avatar-url'],
          lastChangedOn: m['last-changed-on'],
          htmlBody: m['html-body'],
          body: m.body,
          authorFirstname: m['author-firstname'],
          authorLastname: m['author-lastname'],
          replyNo: m.replyNo,
        })
      }
      let result = await handleLocalApiRequest(formattedMessageReplies, 'message-replies');
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    })
  })
}

export function getMessageReplies(project_id,message_id,key) {
  return async (dispatch) => {
    let result = await handleMessageReplyApiRequest(project_id,message_id,key)
    console.log(result);
  }
}
