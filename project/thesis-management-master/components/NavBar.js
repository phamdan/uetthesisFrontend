
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      name: "",
    };
  }

  componentDidMount() {
    this.setState({
      role:
        localStorage.getItem("userRole") === "STU" ? "Sinh viên" : "Giảng viên",
    });
    let info = this.b64DecodeUnicode(
      localStorage.getItem("token") ? localStorage.getItem("token").split(".")[1] : ""
    );
    info = JSON.parse(info);
    localStorage.setItem("fullName", info.data.fullName);
    this.setState({ name: info.data.fullName });
  }

  b64DecodeUnicode(str) {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  }
  checkRole(role){
    if(role==='Sinh viên') return "none";
    return "initial";
  }
  render() {
    const { onLogout } = this.props;
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <div className="navbar-header">
            <span className="navbar-brand">
              Quản lý khóa luận ({this.state.role})
            </span>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li style={{display:this.checkRole(this.state.role)}}>
              <a href="#" data-toggle="modal"
                  data-target="#ModalThesis"
                  onClick={e => this.props.onAddThesis()}>
                Thêm khóa luận
              </a>
            </li>
            <li>
              <a href="#">
                <span className="glyphicon glyphicon-user"></span>{" "}
                {this.state.name}
              </a>
            </li>
            <li>
              <a href="#" onClick={onLogout}>
                <span className="glyphicon glyphicon-log-in"></span> Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
