import {Component} from 'react'
import './index.css'

import Header from '../Header'
import Profile from '../Profile'
import JobList from '../JobList'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    isCheckClicked: true,
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    isCheckClicked: true,
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    isCheckClicked: true,
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    isCheckClicked: true,
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    salaryRangeId: '',
    employmentTypeIdList: [],
  }

  onEmptypeChange = (item, isCheckClicked) => {
    const {employmentTypeIdList} = this.state
    const clickedEmpId = item.employmentTypeId

    let updatedEmpTypeIdList

    if (isCheckClicked) {
      updatedEmpTypeIdList = [...employmentTypeIdList, clickedEmpId]
    } else {
      updatedEmpTypeIdList = employmentTypeIdList.filter(
        eachId => eachId !== clickedEmpId,
      )
    }
    console.log(updatedEmpTypeIdList)

    this.setState({employmentTypeIdList: updatedEmpTypeIdList})

    for (let i = 0; i < employmentTypesList.length; i += 1) {
      if (employmentTypesList[i].employmentTypeId === clickedEmpId) {
        employmentTypesList[i].isCheckClicked = !employmentTypesList[i]
          .isCheckClicked
      }
    }
  }

  onSalaryRangeChange = item => {
    this.setState({salaryRangeId: item.salaryRangeId})
  }

  renderEmploymentType = () => (
    <ul className="employment-type-container">
      <h1>Type of Employment</h1>
      {employmentTypesList.map(item => (
        <li className="types-list-container" key={item.employmentTypeId}>
          <input
            type="checkbox"
            id={item.employmentTypeId}
            value={item.employmentTypeId}
            onChange={() => this.onEmptypeChange(item, item.isCheckClicked)}
          />
          <label htmlFor={item.employmentTypeId} className="emp-label-element">
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderSalaryRangeType = () => (
    <ul className="employment-type-container">
      <h1>Salary Range</h1>
      {salaryRangesList.map(item => (
        <li className="types-list-container" key={item.salaryRangeId}>
          <input
            type="radio"
            id={item.salaryRangeId}
            value={item.salaryRangeId}
            name="salaryRange"
            onChange={() => this.onSalaryRangeChange(item)}
          />
          <label htmlFor={item.salaryRangeId} className="emp-label-element">
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  )

  render() {
    const {salaryRangeId, employmentTypeIdList} = this.state
    const empTypeIdQuery = employmentTypeIdList.join(',')
    console.log(empTypeIdQuery)
    return (
      <div className="job-main-bg">
        <Header />
        <div className="job-body-section">
          <div className="left-nav-bar">
            <Profile />
            <hr className="break-element" />
            {this.renderEmploymentType()}
            <hr className="break-element" />
            {this.renderSalaryRangeType()}
          </div>
          <div className="job-description-container">
            <JobList
              empTypeIdQuery={empTypeIdQuery}
              salaryRangeId={salaryRangeId}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
