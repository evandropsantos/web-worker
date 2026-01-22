export default class Controller {
  #view
  #worker
  #service
  #events = {
    alive: () => { },
    progress: ({ total }) => { this.#view.updateProgress(total) },
    ocurrenceUpdate: ({ found, linesLength, took }) => {
      const [[key, value]] = Object.entries(found)
      this.#view.updateDebugLog(
        `encontrado ${value} ocorrências de ${key} - em ${linesLength} linhas - levou: ${took}`
      )
    },
  }

  constructor({ view, worker, service }) {
    this.#view = view
    this.#worker = this.#configureWorker(worker)
    this.#service = service
  }

  static init(deps) {
    const controller = new Controller(deps)
    controller.init()

    return controller
  }

  init() {
    this.#view.configureOnFilesChange(
      this.#configureOnFilesChange.bind(this)
    )

    this.#view.configureOnFormSubmit(
      this.#configureOnFormSubmit.bind(this)
    )
  }

  #configureWorker(worker) {
    worker.onmessage = ({ data }) => this.#events[data.eventType](data)

    return worker
  }

  #formatBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let i = 0

    for(i; bytes >= 1024 && i < 4; i++) {
      bytes /= 1024
    }

    return `${bytes.toFixed(2)} ${units[i]}`
  }

  #configureOnFilesChange(file) {
    this.#view.setFileSize(this.#formatBytes(file.size))
  }

  #configureOnFormSubmit({ description, file }) {
    const query = {}
    query['call description'] = new RegExp(description, 'i')

    if(this.#view.isWorkerEnabled()) {
      console.log('Executando na thread do worker!')
      this.#worker.postMessage({ query, file })
      return
    }

    console.log('Executando na Main thread!')

    this.#service.processFile({
      query,
      file,
      onProgress: (total) => {
        this.#events.progress({ total })
      },
      onOcurrenceUpdate: (args) => {
        this.#events.ocurrenceUpdate(args)
      }
    })
  }
}
