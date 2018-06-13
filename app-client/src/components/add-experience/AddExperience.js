import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InputFieldGroup from '../common/form/InputFieldGroup';
import TextAreaFieldGroup from '../common/form/TextAreaFieldGroup';
import {initAddExperience} from '../../store/actions/profile';

class AddExperience extends Component {
  state = {
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    isStillWorking: false,
  };

  onSubmit = (event) => {
    event.preventDefault();

    const experienceData = {...this.state};
    if (this.state.isStillWorking) {
      delete experienceData['to'];
    }
    this.props.initAddExperience(experienceData, this.props.history);
  };

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  onCheck = () => {
    this.setState(prevState => ({
      isStillWorking: !prevState.isStillWorking,
      current: !prevState.current
    }));
  };

  render() {
    const {errors} = this.props;
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link className="btn btn-light" to="/dashboard">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">Add any adequate experience you have.</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <InputFieldGroup
                  error={errors.title}
                  name="title"
                  onChange={this.onChange}
                  placeholder="* Job Title"
                  required={true}
                  value={this.state.title}/>
                <InputFieldGroup
                  error={errors.company}
                  name="company"
                  onChange={this.onChange}
                  placeholder="* Company Name"
                  required={true}
                  value={this.state.company}/>
                <InputFieldGroup
                  error={errors.location}
                  name="location"
                  onChange={this.onChange}
                  placeholder="* Location"
                  required={true}
                  value={this.state.location}/>
                <h6>From Date</h6>
                <InputFieldGroup
                  error={errors.from}
                  name="from"
                  onChange={this.onChange}
                  placeholder="* From Date"
                  required={true}
                  type="date"
                  value={this.state.from}/>
                <h6>To Date</h6>
                <InputFieldGroup
                  disabled={this.state.isStillWorking}
                  error={errors.to}
                  name="to"
                  onChange={this.onChange}
                  placeholder="* To Date"
                  required={true}
                  type="date"
                  value={this.state.to}/>
                <div className="form-check mb-4">
                  <input
                    checked={this.state.current}
                    className="form-check-input"
                    id="current"
                    name="current"
                    onChange={this.onCheck}
                    type="checkbox"
                    value={this.state.current}/>
                  <label className="form-check-label" htmlFor="current">
                    Current job
                  </label>
                </div>
                <TextAreaFieldGroup
                  error={errors.description}
                  info="Describe your responsibilities and achievements."
                  name="description"
                  onChange={this.onChange}
                  placeholder="Short job description"
                  value={this.state.description}/>
                <input type="submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  initAddExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initAddExperience: (payload, history) => dispatch(initAddExperience(payload, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExperience);