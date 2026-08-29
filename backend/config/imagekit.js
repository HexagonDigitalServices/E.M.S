export const deleteFromImageKit = async (url) => {
  try {
    if (!url || typeof url !== 'string' || !url.includes('ik.imagekit.io')) {
      return null;
    }

    const fileName = url.substring(url.lastIndexOf('/') + 1);
    if (!fileName) return null;

    const files = await imagekit.assets.list({
      searchQuery: `name = "${fileName}"`
    });

    if (files && files.length > 0) {
      const fileId = files[0].fileId;
      const deleteResult = await imagekit.files.delete(fileId);
      return deleteResult;
    }
    return null;
  } catch (error) {
    throw new Error(`ImageKit deletion failed: ${error.message}`);
  }
};