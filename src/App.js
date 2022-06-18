import { Component } from "react";
import "./style.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import NavDropdown from "react-bootstrap/NavDropdown";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';

// Downloads
const DownloadModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    下載 NoyAcg APP
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>注意</h4>
                <p>公共邀請碼：<font color="red">NoyAcg2022</font></p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>關閉</Button>
                <Button onClick={() => {
                    if (!props.isChinaMainland) {
                        window.open("https://unpkg.com/noyacg-app/" + props.appname);
                        console.info("isChinaMainland: true");
                    } else {
                        window.open("https://npm.elemecdn.com/noyacg-app/" + props.appname);
                    }
                    window.location = props.forum;
                }}>下載</Button>
            </Modal.Footer>
        </Modal>
    );
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            downloadShow: false,
            isChinaMainland: false
        }
    }

    componentDidMount() {
        // Get bg
        let month = new Date().getMonth();
        let bg = document.getElementById("bg");
        if (month >= 0 && month < 3) {
            bg.style.backgroundImage = "url(https://ci.cncn3.cn/8f0912b0f46cee4a6a19492d9a3e7bb5.webp)"; // 冬
            let b1 = document.getElementsByClassName('noy-button')[0]; b1.style.backgroundColor = "#79828f"; b1.style.color = "#FFF";
        } else if (month >= 3 && month < 6) {
            bg.style.backgroundImage = "url(https://ci.cncn3.cn/626c72f387440d4550778a007f467e06.webp)"; // 春
        } else if (month >= 6 && month < 9) {
            bg.style.backgroundImage = "url(https://ci.cncn3.cn/41ce655fd84ca274a9980fb2d5f24f2f.webp)"; // 夏
            document.getElementsByName("title").forEach(e => { e.style.color = "#FFFFFF" })
        } else {
            bg.style.backgroundImage = "url(https://ci.cncn3.cn/36919ebc4153019cba97566c5aa03e95.webp)"; // 秋
        }
        // Get Config
        axios({
            url: "/msg.json"
        }).then(res => {
            if (res.data.status) {
                this.setState({
                    showToast: true,
                    toastUser: res.data.user,
                    toastCover: res.data.cover,
                    toastMsg: res.data.msg,
                    toastTime: res.data.time
                })
            }
        });
        // Get IP
        axios({
            url: "https://public-api.noy.asia/api/geoip"
        }).then(res => {
            let country; // country 有國家/地區的含義，NoyAcg 不支持港獨/台獨
            switch (res.data.country) {
                case "HK": country = "香港"; break;
                case "TW": country = "台灣"; break;
                case "JP": country = "日本"; break;
                case "CN": country = "中國大陸"; this.setState({ isChinaMainland: true }); break;
                default: country = res.data.country;
            }
            this.setState({ r18Show: true, c: country });
        })
    }

    render() {
        let { showToast, toastCover, toastUser, toastMsg, toastTime, downloadShow, isChinaMainland, r18Show, c } = this.state;

        return (
            <div>
                <Navbar bg="light" expand="lg" variant="light" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 10 }}>
                    <Container>
                        <Navbar.Brand href="#home">
                            <img
                                alt=""
                                src="/favicon.webp"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{" "}
                            NoyAcg
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse
                            id="basic-navbar-nav"
                            className="justify-content-end"
                        >
                            <Nav>
                                <Nav.Link className="navLink" href="https://forum.noy.asia/?_from=_home_button" target={"_blank"}>社區</Nav.Link>
                                <NavDropdown className="navLink" title="群組" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="https://t.me/noyacg" target="_blank" rel="noreferrer">Telegram</NavDropdown.Item>
                                    <NavDropdown.Item href="https://discord.gg/W8CxcAstGh" target="_blank" rel="noreferrer">Discord</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link className="navLink" href="#bulletin">公告板</Nav.Link>
                                <Nav.Link className="navLink" href="#downloads">即刻開始</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div style={{ position: 'fixed', top: '56px', width: '100%', height: '50px', backgroundColor: '#e9f3ff', zIndex: 9 }}>
                    <p className="uhash">公共邀請碼：<b className="uhash-b">NoyAcg2022</b></p>
                </div>
                <div id="home">
                    <div id="bg"></div>
                    <div class="text home-text">
                        <h1 name="title" style={{ fontSize: '46px', marginBottom: '30px' }}>你好，歡迎來到NoyAcg！</h1>
                        <p name="title" className="de-text">NoyAcg是一個專屬於紳士們的站點(/≧▽≦)/</p>
                        <a href="#bulletin"><Button className="noy-button" style={{ backgroundColor: '#e9f3ff', border: 0, color: '#2d8eff' }} size="lg">公告板</Button></a>
                        <a href="#downloads"><Button className="noy-button" variant="primary" size="lg">即刻開始</Button></a>
                    </div>
                </div>
                <div style={{ backgroundColor: '#FFF' }}>
                    <div style={{ textAlign: 'center', padding: '50px 16px 100px 16px', margin: '0 auto', maxWidth: 900 }}>
                        <h2 style={{ fontSize: '2rem' }}>瞭解一下？</h2>
                        <p className="de-text">NoyAcg是一個完全自研架構的平台!</p>
                        <Accordion defaultActiveKey="0" style={{ marginTop: 32 }}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>關於 NoyTeam</Accordion.Header>
                                <Accordion.Body className="noy-accordion">
                                    NoyTeam是NoyAcg的開發/運營組織，成立於2020年2月19日！目前由2個成員組成，目標是以優質服務承載牛子和未來。
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>關於 NoyAcg</Accordion.Header>
                                <Accordion.Body className="noy-accordion">
                                    NoyAcg在2021年5月1日開始開發，在半個月後推出測試版，是一個公益本子平台，擁有完全自研的架構和高質量網絡線路/獨立伺服器源站承載！
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>贊助我們</Accordion.Header>
                                <Accordion.Body>
                                    <p>歡迎贊助NoyAcg!<br />(愛發電手續費較低，但是只支援中國大陸支付方式)</p>
                                    <a href="https://afdian.net/@niaopark" target="_blank" rel="noreferrer"><Button className="noy-pay-button" style={{ backgroundColor: '#7e5fd9' }}>愛發電</Button></a>
                                    <a href="https://www.patreon.com/noyteam" target="_blank" rel="noreferrer"><Button className="noy-pay-button" style={{ backgroundColor: '#ff424d' }}>Patreon</Button></a>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
                <div style={{ textAlign: 'center', padding: '30px 0 100px 0', margin: '0 16px' }} id="bulletin">
                    <h2 style={{ fontSize: '2rem' }}>公告板</h2>
                    <p className="de-text">Bulletin Board</p>
                    <Container style={{ marginTop: 32, margin: '0 auto', maxWidth: 1000 }}>
                        <Row>
                            <Col md="4" xs="12" style={{ marginTop: 20 }}>
                                <a href="https://forum.noy.asia/d/18" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#000000' }}>
                                    <Card className="noy-card">
                                        <Card.Img variant="top" src="https://ci.cncn3.cn/7b46910047927c87c72962a2f4c89a63.png" />
                                        <Card.Body>
                                            <Card.Title>如何設定頭像</Card.Title>
                                            <Card.Text style={{ color: '#5b617c' }}>
                                                使用教學
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </a>
                            </Col>
                            <Col md="4" xs="12" style={{ marginTop: 20 }}>
                                <a href="https://bill.noyteam.online/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#000000' }}>
                                    <Card className="noy-card">
                                        <Card.Img variant="top" src="https://ci.cncn3.cn/7166dc6ec543e56947dc5545e3764ed2.png" />
                                        <Card.Body>
                                            <Card.Title>NoyTeam 贊助透明化</Card.Title>
                                            <Card.Text style={{ color: '#5b617c' }}>
                                                贊助統計
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </a>
                            </Col>
                            <Col md="4" xs="12" style={{ marginTop: 20 }}>
                                <a href="https://forum.noy.asia/d/24-noyacg-2021" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#000000' }}>
                                    <Card className="noy-card">
                                        <Card.Img variant="top" src="https://ci.cncn3.cn/c706165ac6dca63b1f0ad3bcdeba6669.png" />
                                        <Card.Body>
                                            <Card.Title>公共邀請碼已開放!</Card.Title>
                                            <Card.Text style={{ color: '#5b617c' }}>
                                                不會再沒有邀請碼了哦！
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </a>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div style={{ backgroundColor: '#282c47', textAlign: 'center' }} id="downloads">
                    <h2 style={{ fontSize: '2rem', color: '#FFFFFF', margin: 0, padding: "60px 0 30px" }}>即刻開始</h2>
                    <Button className="noy-button" variant="primary" size="lg" onClick={() => { this.setState({ downloadShow: true }) }}>Android</Button>
                    <a href="https://app.noy.asia" target="_blank" rel="noreferrer"><Button className="noy-button" variant="primary" size="lg">Web 網站</Button></a>
                    <Container style={{ padding: '40px 0 30px' }}>
                        <Row style={{ "--bs-gutter-x": 'unset' }}>
                            <Col md="4" xs="12">
                                <small style={{ color: '#5b617c', fontSize: '80%', fontWeight: '400' }}>© NoyTeam 2021-2022</small>
                            </Col>
                            <Col md="4" xs="12">
                                <a href="https://twitter.com/noysupport" target="_blank" rel="noreferrer" style={{ margin: '0 5px' }}>
                                    <img src="/logo-twitter.svg" alt="" style={{ width: 20 }} />
                                </a>
                                <a href="https://github.com/noyteam" target="_blank" rel="noreferrer" style={{ margin: '0 5px' }}>
                                    <img src="/logo-github.svg" alt="" style={{ width: 20 }} />
                                </a>
                            </Col>
                            <Col md="4" xs="12">
                                <small style={{ color: '#5b617c' }}><a style={{ textDecoration: 'none' }} href="/privacy_agreement.html" target="_blank">隱私協議</a> · Powered by <a style={{ textDecoration: 'none' }} href="https://forum.noy.asia" target="_blank" rel="noreferrer">NoyTeam</a></small>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <DownloadModal
                    show={downloadShow}
                    onHide={() => this.setState({ downloadShow: false })}
                    appname={"asia.noy.now_2.3x.apk"}
                    forum={"https://forum.noy.asia/d/75-android-app-23"}
                    isChinaMainland={isChinaMainland}
                />

                <Modal
                    show={r18Show}
                    onHide={() => this.setState({ r18Show: false })}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Warning!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: 'center' }}>
                        <img height="100px" width="100px" style={{ margin: 24 }} src="/R18.webp" alt="" />
                        <h3>請確保你已滿 18 歲</h3>
                        <h4>並符合 {c} 的法律條款</h4>
                        <p>*繼續訪問代表您已閲讀我們的 <a href="/privacy_agreement.html" target={"_blank"}>隱私協議</a></p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ r18Show: false })}>繼續</Button>
                    </Modal.Footer>
                </Modal>

                <Toast onClose={() => this.setState({ showToast: false })} show={showToast} delay={5000} autohide className="noy-toast">
                    <Toast.Header>
                        <img
                            src={toastCover}
                            style={{ width: 24 }}
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">{toastUser}</strong>
                        <small>{toastTime}</small>
                    </Toast.Header>
                    <Toast.Body>{toastMsg}</Toast.Body>
                </Toast>
            </div>
        );
    }
}

export default App;
