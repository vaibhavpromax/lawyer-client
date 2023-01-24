import axios from "axios";

class Service {
  constructor() {
    let service = axios.create({
      headers: { "Content-Type": "application/json" },
      baseURL: "http://localhost:8080/",
    });
    this.handleError = this.handleError.bind(this); // Binding the context
    this.handleSuccess = this.handleSuccess.bind(this); // Binding the context
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
    this.storeData = {};
    this.historyObj = {};
  }

  setStoreDataForService(storeDataParam = {}) {
    this.storeData = storeDataParam;
  }

  setHistoryObj(historyObj) {
    this.historyObj = historyObj;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    console.log("ERROR");
    if (error.response.status === 401) {
      // if unauthorized, redirect to signUp
      console.log("resetting creds");
      localStorage.removeItem("Authorization");
      sessionStorage.removeItem("uuid");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("leads");
      sessionStorage.removeItem("lead");
      window.location.href = window.location.origin + "/login";
    }
  }

  get(path) {
    return this.service.get(path, {
      headers: {
        Authorization: `Bearer ${
          !!localStorage.getItem("user") &&
          JSON.parse(localStorage.getItem("user"))?.accessToken
        }`,
      },
    });
  }

  patch(path, payload) {
    return this.service.request({
      method: "PATCH",
      url: path,
      responseType: "json",
      data: payload,
      headers: {
        Authorization: `Bearer ${
          !!localStorage.getItem("user") &&
          JSON.parse(localStorage.getItem("user"))?.accessToken
        }`,
      },
    });
  }

  post(path, payload) {
    return this.service.request({
      method: "POST",
      url: path,
      responseType: "json",
      data: payload,
      headers: {
        Authorization: `Bearer ${
          !!localStorage.getItem("user") &&
          JSON.parse(localStorage.getItem("user"))?.accessToken
        }`,
      },
      timeout: 1000000,
    });
  }

  postBlob(path, payload) {
    return this.service.request({
      method: "POST",
      url: path,
      responseType: "blob",
      data: payload,
      headers: {
        Authorization: `Bearer ${
          !!localStorage.getItem("user") &&
          JSON.parse(localStorage.getItem("user"))?.accessToken
        }`,
      },
    });
  }

  // postDownload(path, payload) {
  //   return this.service.request({
  //     method: "POST",
  //     url: path,
  //     responseType: "blob",
  //     data: payload,
  //     headers: { Authorization:`Bearer ${JSON.parse(localStorage.getItem("user"))?.accessToken}` },
  //   });
  // }

  postDownload(path, fileName, payload) {
    axios({
      url: path,
      method: "POST",
      data: payload,
      headers: {
        Authorization: `Bearer ${
          !!localStorage.getItem("user") &&
          JSON.parse(localStorage.getItem("user"))?.accessToken
        }`,
      },
      responseType: "blob", // Important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); //or any other extension
      // document.body.appendChild(link);
      link.click();
    });
  }

  postMfine(path, payload) {
    return this.service.request({
      method: "POST",
      url: path,
      responseType: "json",
      data: payload,
      headers: {
        client_id: "shiftrisk",
        secret_key:
          "CGNyKZoPa1P0sYbDAx8A7dD4To1kzihjV0WYzCS5WxvDkv3ll2EagXYCdn3pUB0u",
        "Content-Type": "application/json",
      },
    });
  }

  getDownload(path, fileName, callbackFunc, setExtension = false) {
    axios({
      url: path,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          !!localStorage.getItem("user") &&
          JSON.parse(localStorage.getItem("user"))?.accessToken
        }`,
      },
      responseType: "blob", // Important
    })
      .then((response) => {
        // console.log(response.headers["content-disposition"].split("filename=")[1], "check here");
        console.log(response.data);
        if (response.data.type === "application/json") {
          callbackFunc(false, "Unable to download...");
        } else {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          if (setExtension) {
            link.setAttribute(
              "download",
              response.headers["content-disposition"].split("filename=")[1]
            ); //or any other extension
          } else {
            link.setAttribute("download", fileName); //or any other extension
          }
          // document.body.appendChild(link);
          link.click();

          // link.download = `${insurer}.xlsx`;
          // link.click();
          callbackFunc(true, "Downloaded the file successfully...");
        }
      })
      .catch((e) => {
        console.log(e, "errors");
        callbackFunc(false, "network error..");
      });
  }

  getFile(path, uuid, fileType, callbackFunc) {
    axios({
      url: `${path}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          !!localStorage.getItem("user") &&
          JSON.parse(localStorage.getItem("user"))?.accessToken
        }`,
      },
      responseType: "blob",
    })
      .then((response) => {
        if (response.data.type !== "application/octet-stream") {
          callbackFunc(false, "Unable to download...");
        } else {
          callbackFunc(true, "downloading...");
          const file = response?.headers?.["content-disposition"];
          const fileName = file.split("=")[1].split(".")[0];
          console.log(fileName, "****");
          const splitFile = file?.split(".");
          const fileFormat = splitFile
            ? splitFile?.[splitFile?.length - 1]
            : "";
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${fileName}.${fileFormat}`); //or any other extension
          // document.body.appendChild(link);
          link.click();
          callbackFunc(true, "File downloaded");
        }
      })
      .catch((err) => {
        callbackFunc(false, "Network error...");
      });
  }

  postUpload(url, data) {
    console.log(data, "Upload data");
    return this.service.request({
      method: "POST",
      url: url,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${
          !!localStorage.getItem("user") &&
          JSON.parse(localStorage.getItem("user"))?.accessToken
        }`,
      },
    });
  }

  put(path, payload) {
    return this.service.request({
      method: "PUT",
      url: path,
      responseType: "json",
      data: payload,
      headers: {
        Authorization: `Bearer ${
          !!localStorage.getItem("user") &&
          JSON.parse(localStorage.getItem("user"))?.accessToken
        }`,
      },
    });
  }

  delete(path, payload) {
    return this.service.request({
      method: "DELETE",
      url: path,
      responseType: "json",
      data: payload,
      headers: {
        Authorization: `Bearer ${
          !!localStorage.getItem("user") &&
          JSON.parse(localStorage.getItem("user"))?.accessToken
        }`,
      },
    });
  }

  get_member_request = (path, id, policyType, callback) => {
    console.log(policyType, `${path}${id}/${policyType}`, "testtttting1");
    return this.service
      .request({
        method: "GET",
        url: `${path}${id}/${policyType}`,
        responseType: "json",
        headers: {
          Authorization: `Bearer ${
            !!localStorage.getItem("user") &&
            JSON.parse(localStorage.getItem("user"))?.accessToken
          }`,
        },
      })
      .then((res) => (callback ? callback(res) : null));
  };

  post_admin_action = (
    path,
    option,
    uuid,
    ids,
    policyType,
    extras,
    callback
  ) => {
    console.log(policyType, "testtttting1");
    const payload = {
      uids: ids,
      uuid: uuid,
      ...extras,
    };
    return this.service
      .request({
        method: "POST",
        url: `${path}${option}`,
        responseType: "json",
        data: payload,
        headers: {
          Authorization: `Bearer ${
            !!localStorage.getItem("user") &&
            JSON.parse(localStorage.getItem("user"))?.accessToken
          }`,
        },
      })
      .then((res) => {
        // callback( res?.data?.success , res?.data?.message)
      })
      .then((res) => {
        this.get_member_request(path, uuid, policyType, callback);
      })
      .catch((err) => callback(false, "Error occured..."));
  };

  get_admin_users = (path, uuid, callback) => {
    return this.service
      .request({
        method: "GET",
        url: `${path}${uuid}`,
        responseType: "json",
        headers: {
          Authorization: `Bearer ${
            !!localStorage.getItem("user") &&
            JSON.parse(localStorage.getItem("user"))?.accessToken
          }`,
        },
      })
      .then((res) => (callback ? callback(res) : null));
  };

  delete_admin_user = (path, uuid, callback) => {
    return this.service
      .request({
        method: "GET",
        url: `${path}${uuid}`,
        responseType: "json",
        headers: {
          Authorization: `Bearer ${
            !!localStorage.getItem("user") &&
            JSON.parse(localStorage.getItem("user"))?.accessToken
          }`,
        },
      })
      .then((res) => (callback ? callback(res) : null));
  };
}

export default new Service();
