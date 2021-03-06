import { convertSolidityIntToInt } from '../../utils'
import * as params from '../../constants/parameters/parameterDetails'

export const constructClientParameterDetails = p => {
  let title
  let placeholder

  let value = convertSolidityIntToInt(p.value)

  if (p.title === params.votingIntervalParameter.title) {
    value = value / 86400 + ' days'
    title = 'How Often Parameters Can Be Voted On'
    placeholder = ''
  }

  if (p.title === params.proposalPctDIDToApproveParameter.title) {
    value = value + '%'
    title = 'Percent of DID required to approve task proposal'
    placeholder = ''
  }

  if (p.title === params.pctDIDRequiredToMergePullRequestParameter.title) {
    value = value + '%'
    title = 'Percent of DID that must approve pull requests'
    placeholder = ''
  }

  if (p.title === params.maxRewardParameter.title) {
    value = value + ' DID'
    title = 'Maximum DID Reward for Tasks'
    placeholder = ''
  }

  if (
    p.title === params.numDIDRequiredToApproveVotePullRequestParameter.title
  ) {
    value = value + ' DID'
    title = 'Number of DID required to approve pull requests'
    placeholder = ''
  }

  if (p.title === params.numDIDRequiredToTaskRewardVoteParameter.title) {
    value = value + ' DID'
    title = 'Number of DID required to vote on task rewards'
    placeholder = ''
  }

  if (p.title === params.numDIDRequiredToAddTaskParameter.title) {
    value = value + ' DID'
    title = 'Number of DID required to add tasks'
    placeholder = ''
  }

  if (p.title === params.minNumberOfTaskRewardVotersParameter.title) {
    value = value + ' voters'
    title = 'Number of voters required  to determine reward'
    placeholder = ''
  }

  if (p.title === params.defaultRewardParameter.title) {
    value = value + ' DID'
    title = 'Default number of DID issuable for each task'
    placeholder = ''
  }

  if (p.title === params.didPerEtherParameter.title) {
    value = value + ' DID'
    title = 'Conversion ratio of DID per ether'
    placeholder = ''
  }

  return {
    value,
    title,
    placeholder
  }
}
