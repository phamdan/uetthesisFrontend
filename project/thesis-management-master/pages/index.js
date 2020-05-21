import Head from "next/head";
import NavBar from "../components/NavBar";
import Router from "next/router";
import ModalInfo from "../components/ModalInfo";
import ModalThesis from "../components/ModalThesis";
import request from "../assets/request";
import "../assets/styles.css";
class Index extends React.Component {
  thesisState = {
    NEW: "Mới",
    WAITTING: "Đang chờ",
    CANCELED: "Hủy",
    ACTIVE: "Hoạt động",
  };

  studentButton = {
    NEW: [
      {
        name: "Đăng ký",
        display: "initial",
        class: "btn btn-success",
        endpoint: "/student/thesis/join/",
        methods: "POST",
      },
    ],
    WAITTING: [
      {
        name: "Hủy",
        display: "initial",
        class: "btn btn-warning",
        endpoint: "/student/thesis/exit/",
        methods: "POST",
      },
    ],
    CANCELED: [],
    ACTIVE: [],
  };

  lecturerButton = {
    NEW: [
      {
        name: "Xóa",
        display: "initial",
        class: "btn btn-danger",
        endpoint: "/lecturer/thesis/delete/",
        methods: "DELETE",
      },
    ],
    WAITTING: [
      {
        name: "Chấp nhận",
        display: "initial",
        class: "btn btn-success",
        endpoint: "/lecturer/thesis/accept/",
        methods: "POST",
      },
      {
        name: "Từ chối",
        display: "initial",
        class: "btn btn-warning",
        endpoint: "/lecturer/thesis/reject/",
        methods: "POST",
      },
    ],
    CANCELED: [],
    ACTIVE: [
      {
        name: "Hủy khóa luận",
        display: "initial",
        class: "btn btn-success",
        endpoint: "/lecturer/thesis/cancel/",
        methods: "POST",
      },
    ],
  };

  state = {
    listThesis: [],
    role: "",
    loading: false,
    arlert: false,
    arlertType: "success",
    arlertName: "Thành công",
    arlertMes: "",
    thesisChoose: {},
    editable: false,
    fullName:"",
    idInfo:{
      type:Number,
      default:0
    },
    numberCompletedThesis:{
      type:Number,
      default:0
    },
    describle:"",
    gender:"",
    email:""
  };

  componentDidMount() {
    request('/auth/verify', 'GET')
      .then(result => {
          if(result && result.httpCode && result.httpCode === 200){
              localStorage.setItem('userId', result.result.userId);
              this.setState({ role: localStorage.getItem("userRole") });
              this.getAllThesis();
          } else {
              Router.push("/login")
          }
      })
  }

  render() {
    return (
      <div className="">
        <Head>
          <title>Thesis management</title>
          <script
            src="https://code.jquery.com/jquery-3.5.1.min.js"
            integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
            crossOrigin="anonymous"
          ></script>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
            integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            crossOrigin="anonymous"
          ></script>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
            integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
            crossOrigin="anonymous"
          />
          {/* <script src="../bootstrap.min.js.map"></script> */}
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        </Head>
        <NavBar onLogout={this.onLogout} onAddThesis={this.onAddThesis}/>
        <div className="container">
          
          <table className="table table-hover" style={{ textAlign: "center" }}>
            <thead className="thead-dark">
              <tr>
                <th scope="col">Mã khóa luận</th>
                <th scope="col">Gỉang viên</th>
                <th scope="col">Sinh viên</th>
                <th scope="col">Khóa luận</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listThesis.map((thesis, index) => (
                <tr
                  key={index}
                  style={{ cursor: "pointer" }}
                >
                  <th scope="row" data-toggle="modal"
                  data-target="#ModalThesis" onClick={e => this.chooseThesis(thesis, false)}>{thesis.thesisCode}</th>
                  <td onClick={e => this.chooseLecturerName(thesis.lecturerName,thesis.lecturerId)}>
                    <a href="#" style={{zIndex:"100"}} data-toggle="modal"
                  data-target="#exampleModal">
                      <span className="glyphicon glyphicon-log-in"></span>
                      {thesis.lecturerName}
                    </a>
                  </td>
                  <td onClick={e => this.chooseStudentName(thesis.studentName,thesis.studentId)}>
                    <a href="#" style={{zIndex:"100"}}  data-toggle="modal"
                  data-target="#exampleModal">
                      <span className="glyphicon glyphicon-log-in"></span>
                      {thesis.studentName}
                    </a></td>
                  <td data-toggle="modal"
                  data-target="#ModalThesis" onClick={e => this.chooseThesis(thesis, false)}>{thesis.thesisSubject}</td>
                  <td data-toggle="modal"
                  data-target="#ModalThesis" onClick={e => this.chooseThesis(thesis, false)}>{this.thesisState[thesis.state]}</td>
                  <td>
                    {this.showButton(
                      this.state.role === "STU"
                        ? this.studentButton[thesis.state]
                        : this.lecturerButton[thesis.state],
                      thesis
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className={`alert alert-${this.state.arlertType} alert-dismissible ${
            this.state.arlert ? "fadein_ele" : "fade"
          }`}
          style={{ position: "fixed", bottom: 0, margin: 0, width: "100%" }}
        >
          <strong>{this.state.arlertName}!</strong> {this.state.arlertMes}
          <button
            type="button"
            className="close"
            onClick={(e) => this.onArlert({ arlert: false })}
          >
            &times;
          </button>
        </div>
        <ModalInfo fullName={this.state.fullName} gender={this.state.gender} describle={this.state.describle} numberCompletedThesis={this.state.numberCompletedThesis} email={this.state.email}/>
        <ModalThesis thesisInfo={this.state.thesisChoose} editable={this.state.editable} onArlert={this.onArlert}/>
      </div>
    );
  }
  chooseLecturerName=(name,id)=>{
    request("/lecturer/info","GET",`id=${id}&userRole=LEC`,{"Content-type": "application/json"},"")
    .then(async (result) => {
      console.log(this.state)
      console.log(result.result)
      this.setState({fullName:name, idInfo:id,numberCompletedThesis:result.result.numberCompletedThesis,describle:result.result.describle,gender:result.result.gender,email:result.result.email})
    });
  }
  chooseStudentName=(name,id)=>{
    request("/student/info","GET",`id=${id}&userRole=STU`,{"Content-type": "application/json"},"")
    .then(async (result) => {
      console.log(result.result[0])
      this.setState({fullName:name, idInfo:id,numberCompletedThesis:result.result[0].numberCompletedThesis,describle:result.result[0].describle,gender:result.result[0].gender, email:result.result[0].email})
    });
  }
  onAddThesis = () => {
    this.chooseThesis({
      thesisCode: "",
      thesisSubject: "",
      lecturerName: localStorage.getItem("fullName"),
      studentName: "",
      studentId: "",
      describle: "",
      state: "NEW"
    }, true)

  }

  chooseThesis = (thesis, editable) => {
    this.setState({thesisChoose: !thesis?"":thesis, editable: editable})
  }

  showButton = (buttons, thesis) => {
    return buttons.map((btn, index) => {
      if (localStorage.getItem("token")) {
        let info = atob(localStorage.getItem("token").split(".")[1]);
        info = JSON.parse(info);
        if (
          (info.data.role === "LEC" &&
            info.data.roleId === thesis.lecturerId) ||
          (info.data.role === "STU" &&
            (info.data.roleId === thesis.studentId || !thesis.studentId))
        )
          return (
            <button
              onClick={(e) =>
                this.doAction(btn.endpoint, thesis.id, btn.methods)
              }
              key={index}
              className={btn.class}
              style={{
                display: btn.display,
                zIndex: "100",
                marginLeft: index !== 0 ? "1rem" : "0",
              }}
            >
              {btn.name}
            </button>
          );
      }
    });
  };

  onLogout = () => {
    let cf = confirm("Bạn có chắc chắn muốn đăng xuất");
    if (cf) {
      this.setState({ loading: true });
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      Router.push("/login");
    }
  };
  getAllThesis = () => {
    request("/thesis/info").then(async (result) => {
      if (
        !result.result ||
        !result.result[0] ||
        result.result === [] ||
        !result.httpCode === 200
      )
        this.setState({ listThesis: [] });
      else {
        this.setState({ listThesis: result.result });
        console.log(this.state);
      }
    });
  };

  onArlert = (state) => {
    this.setState(state);
  };

  doAction = (endpoint, thesisId, methods) => {
    request(endpoint + thesisId, methods).then((result) => {
      if (result && result.httpCode && result.httpCode === 200) {
        this.onArlert({
          loading: false,
          arlert: true,
          arlertType: "success",
          arlertName: "Thành công",
          arlertMes: "Thực hiện hành động thành công",
        });
        setTimeout(window.location.reload(), 2000);
      } else {
        this.onArlert({
          loading: false,
          arlert: true,
          arlertType: "danger",
          arlertName: "Thất bại",
          arlertMes: "Thực hiện hành động thất bại",
        });
      }
    });
  };
}
export default Index;
