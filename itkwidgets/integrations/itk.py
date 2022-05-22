HAVE_ITK = False
try:
    import itk
    HAVE_ITK = True
except ImportError:
    pass

import itkwasm


if HAVE_ITK:
    import itk

    def image_to_wasm_image(image):
        image_dict = itk.dict_from_image(image)
        wasm_image = itkwasm.Image(**image_dict)
        return wasm_image

