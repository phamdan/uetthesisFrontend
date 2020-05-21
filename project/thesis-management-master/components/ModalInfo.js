class ModalInfo extends React.Component {
  render() {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Thông tin 
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form style={{width: "100%"}}>
                <div className="form-group row">
                  <label htmlFor="staticName" className="col-sm-4 col-form-label">
                    Tên
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      id="staticName"
                      value={this.props.fullName}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="gender" className="col-sm-4 col-form-label">
                    Giới tính
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      id="gender"
                      value={this.props.gender}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="staticEmail" className="col-sm-4 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      id="staticEmail"
                      value={this.props.email}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="staticDescrible" className="col-sm-4 col-form-label">
                    Describle
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      id="staticDescrible"
                      value={!this.props.describle?"":this.props.describle}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="staticDescrible" className="col-sm-4 col-form-label">
                    Describle
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      id="staticDescrible"
                      value={!this.props.describle?"":this.props.describle}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ModalInfo;
