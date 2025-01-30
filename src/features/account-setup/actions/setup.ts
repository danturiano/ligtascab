// type UploadProps = {
// 	file: File;
// 	bucket: string;
// 	folder?: string;
// };

// export const uploadImage = async ({ file, bucket, folder }: UploadProps) => {
// 	const fileName = file.name;
// 	const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
// 	const path = `${folder ? folder + '/' : ''}${uuidv4()}.${fileExtension}`;

// 	try {
// 		file = await imageCompression(file, {
// 			maxSizeMB: 1,
// 		});
// 	} catch (error) {
// 		console.error(error);
// 		return { imageUrl: '', error: 'Image compression failed' };
// 	}

// 	const { data, error } = await supabase.storage
// 		.from(bucket)
// 		.upload(path, file);

// 	if (error) {
// 		return { imageUrl: '', error: 'Image upload failed' };
// 	}

// 	const imageUrl = `${process.env
// 		.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${
// 		data?.path
// 	}`;

// 	return { imageUrl, error: '' };
// };
