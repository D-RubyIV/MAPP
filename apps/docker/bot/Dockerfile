FROM python:3.10-slim
WORKDIR /apps/bot
# Cài đặt Git
RUN apt-get update && apt-get install -y git
# Copy mã nguồn của bạn vào container
COPY ./apps/bot .
# Cập nhật pip
RUN pip3 install --upgrade pip
# Cài đặt các dependencies từ requirements.txt
RUN pip3 install -r requirements.txt
# Cài đặt Telethon từ repository GitHub private của bạn sử dụng Git
RUN pip3 install --no-cache-dir --upgrade git+https://D-RubyIV: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@github.com/D-RubyIV/Telethon
# CMD để chạy ứng dụng của bạn khi container được khởi chạy
CMD python main.py