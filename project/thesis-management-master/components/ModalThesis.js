import request from "../assets/request";
class ModalThesis extends React.Component {
    thesisState = {

        NEW: "Mới",
        WAITTING: "Đang chờ",
        CANCELED: "Hủy",
        ACTIVE: "Hoạt động",
      };
    state={
        thesisCode:"",
        thesisSubject:"",
        describle:"",
        university: "uet",
        branch: "cntt"
    }
    render() {
      return (
        <div
          className="modal fade"
          id="ModalThesis"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title col-sm-6" id="exampleModalLabel">
                  Thông tin khóa luận
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
                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">
                      Mã khóa luận
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        disabled={!this.props.editable}
                        className="form-control-plaintext"
                        id="staticEmail"
                        value={this.state.thesisCode || this.props.thesisInfo.thesisCode}
                        onChange={e=>this.setState({thesisCode:e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">
                      Tên khóa luận
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        disabled={!this.props.editable}
                        className="form-control-plaintext"
                        id="staticEmail"
                        value={this.state.thesisSubject||this.props.thesisInfo.thesisSubject}
                        onChange={e=>this.setState({thesisSubject:e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">
                      Tên giảng viên
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        disabled
                        className="form-control-plaintext"
                        id="staticEmail"
                        value={this.props.thesisInfo.lecturerName}
                      />
                    </div>
                  </div>
                  <div className="form-group row" style={{display:!this.props.editable ? "":"none" }}>
                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label">
                            Tên sinh viên
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                disabled
                                className="form-control-plaintext"
                                id="staticEmail"
                                value={this.props.thesisInfo.studentName}
                                
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label">
                            Mô tả
                        </label>
                        <div className="col-sm-8">
                            {
                        !this.props.editable ? 
                        <div
                                type="text"
                                className="form-control-plaintext"
                                style={{wordBreak: "break-word"}}
                            > {this.state.describle||this.props.thesisInfo.describle}</div>
                        :
                        <input
                                type="text"
                                disabled={!this.props.editable}
                                className="form-control-plaintext"
                                id="staticEmail"
                                value={this.state.describle||this.props.thesisInfo.describle}
                                onChange={e=>this.setState({describle:e.target.value})}
                            />
                            }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label">
                            Trạng thái
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                disabled
                                className="form-control-plaintext"
                                id="staticEmail"
                                value={this.thesisState[this.props.thesisInfo.state]}
                            />
                        </div>
                    </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  style={{display:!this.props.editable ? "none":"" }}
                  onClick={e => this.addThesis()}
                >
                  Save
                </button>
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
      )
    }
    addThesis = () => {
        let cf = confirm("Bạn có chắc chắn thực hiện hành động này không. Hành động này có thể ảnh hưởng lớn đến kết quả sau này");
        if (cf){
            this.props.onArlert({loading: true})
            request('/lecturer/thesis/create', 'POST',' ',{"Content-type": "application/json"},{...this.state})
              .then (result => {
                  if(result && result.httpCode && result.httpCode === 200){
                    this.props.onArlert({
                      loading: false,
                      arlert: true,
                      arlertType: 'success',
                      arlertName: 'Thành công',
                      arlertMes: 'Tạo khóa luận mới thành công'
                    })
                    setTimeout(window.location.reload(),2000)
                  }
            })
        }
    }
  }
  export default ModalThesis;
  