import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InputFieldGroup from '../common/form/InputFieldGroup';
import TextAreaFieldGroup from '../common/form/TextAreaFieldGroup';
import {initAddEducation} from '../../store/actions/profile';

class AddEducation extends Component {
  state = {
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
    isStillLearning: false,
  };

  onSubmit = (event) => {
    event.preventDefault();

    const educationData = {...this.state};
    if (this.state.isStillLearning) {
      delete educationData['to'];
    }
    this.props.initAddEducation(educationData, this.props.history);
  };

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  onCheck = () => {
    this.setState(prevState => ({
      isStillLearning: !prevState.isStillLearning,
      current: !prevState.current
    }));
  };

  render() {
    const {errors} = this.props;
    return (
      <div className="section add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link className="btn btn-light" to="/dashboard">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">Add any adequate education you have.</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <InputFieldGroup
                  error={errors.school}
                  name="school"
                  onChange={this.onChange}
                  placeholder="* School Name"
                  required={true}
                  value={this.state.school}/>
                <InputFieldGroup
                  error={errors.degree}
                  name="degree"
                  onChange={this.onChange}
                  placeholder="* Degree Title"
                  required={true}
                  value={this.state.degree}/>
                <InputFieldGroup
                  error={errors.fieldOfStudy}
                  name="fieldOfStudy"
                  onChange={this.onChange}
                  placeholder="* Field of Study"
                  required={true}
                  value={this.state.fieldOfStudy}/>
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
                  disabled={this.state.isStillLearning}
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
                    Still educating
                  </label>
                </div>
                <TextAreaFieldGroup
                  error={errors.description}
                  info="Describe what you've learned."
                  name="description"
                  onChange={this.onChange}
                  placeholder="Short education description"
                  value={this.state.description}/>
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  disabled={this.props.isDataLoading}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  initAddEducation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  isDataLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    profile: state.profile,
    isDataLoading: state.common.isDataLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initAddEducation: (payload, history) => dispatch(initAddEducation(payload, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEducation);