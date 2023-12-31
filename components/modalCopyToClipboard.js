import BtnPopClose from "./btnPopClose";
import Divider from "./divider";
import TextH1 from "./textH1";

export default function ModalCopyToClipboard({products, onClick}) {

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom border border-b-300 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div onClick={onClick}>
              <BtnPopClose />
            </div>
            <div className="mt-3 text-center">
              <TextH1 text="Copy to clipboard" xtra="mt-3" />
              <Divider />
              <p className="mt-3 mb-6">
                {`Copied ${products?.length} rows to clipboard`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}